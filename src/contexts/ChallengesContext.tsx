import { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useLogin } from '../hooks/users/useLogin'

import md5 from 'md5'
import Swal from 'sweetalert2'

import Cookies from 'js-cookie'

import { LevelUpModal } from '../components/LevelUpModal'

import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}
interface ChallengesContextData {
  id: string
  name: string
  level: number
  currentExp: number
  activeChallenge: Challenge
  challengesCompleted: number
  experienceToNextLevel: number
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExp: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useLogin(email, password)

  const [level, setLevel] = useState(rest.level ?? 1)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState(false)

  // Estado atual da experiência do usuário.
  const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0)

  // Desafios completados.
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  )

  const [activeChallenge, setActiveChallenge] = useState(null)

  // Abrir o modal só quando o usuário upar de lvl;
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  // Calculando a xp do usuário de acordo com a xp atual do lvl.
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  // Perdir permissão para enviar notificação para o usuário
  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    if (!sessionStorage.getItem('fix')) {
      router.push('/login')
    }
    if (!sessionStorage.getItem('dix')) {
      router.push('/login')
    }
    setEmail(sessionStorage.getItem('fix'))
    setPassword(sessionStorage.getItem('dix'))
  }, [])

  useEffect(() => {
    setId(login?.id)
    setName(login?.name)
    setLevel(login?.level)
    setCurrentExp(login?.currentXP)
    setChallengesCompleted(login?.challengesComplete)
  }, [login])

  // Armazendo dados nos cookies.
  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExp', String(currentExp))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExp, challengesCompleted])

  useEffect(() => {
    if (image === true) {
      Swal.fire({
        imageUrl: '/laboral.png',
        imageHeight: 440,
        imageWidth: 995,
        imageAlt: 'A tall image',
      }).then((result) => {
        if (result.isConfirmed) {
          setImage(false)
        }
      })
    }
  }, [image])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  // Função para fechar o modal do lvl.
  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  // Função para disparar um novo desafio.
  function startNewChallenge() {
    setImage(true)
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)

    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    // Tocar áudio no browser.
    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} de XP!`,
      })
    }
  }

  // Função chamada quando o usuário falhar.
  function resetChallenge() {
    setActiveChallenge(null)
  }

  // Função de completar um desafio.
  function completeChallenge() {
    // Essa função não pode ser chamada se o usuário não estiver com um desafio ativo.
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExp = currentExp + amount

    if (finalExp >= experienceToNextLevel) {
      finalExp = finalExp - experienceToNextLevel
      levelUp()
    }

    setCurrentExp(finalExp)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        id,
        name,
        level,
        currentExp,
        activeChallenge,
        challengesCompleted,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
