import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { ChallengesContext } from './ChallengesContext'
import moment from 'moment'

interface CountdownContextData {
  hours: number
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  handleSearchClient: any
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

/**
 * Tempo para a contagem.
 * O countdown precisa começar de um tempo e ir diminuindo em segundos.
 * (25 minutos * 60 segundos.)
 */

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0)

  const [hasFinished, setHasFinished] = useState(false)

  // Estado da contage, se está ativa ou não, no começo está inativo.
  const [isActive, setIsActive] = useState(false)

  // Retornando o número de horas totais.
  const hours = Math.floor(time / 60 / 60)

  const minutes = Math.floor((time / 60) % 60)
  // Retornando o resto da divisão.
  const seconds = time % 60

  const handleSearchClient = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      try {
        const formatValue = value.toString()
        setTime(moment.duration(formatValue).asHours() * 60 * 60)
      } catch (err) {
        console.log(err)
      }
    },
    [time]
  )

  // Função para iniciar a contagem.
  function startCountdown() {
    setIsActive(true)
  }

  // Função para resetar a contagem.
  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    // Voltando para o tempo total.
    setTime(0)
  }

  useEffect(() => {
    // console.log(active);
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      // console.log("ACABOU!");
      setHasFinished(true)

      // Quanto finalizar o tempo tem que parar, por isso que troca o estado para falso.
      setIsActive(false)

      // Começa um novo desafio.
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider
      value={{
        hours,
        minutes,
        seconds,
        hasFinished,
        isActive,
        handleSearchClient,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
