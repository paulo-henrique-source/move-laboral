import { useContext, useState, useEffect } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import { useUpdateUser } from '../hooks/users/useUpdateUser'

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const updateUser = useUpdateUser()

  const {
    id,
    level,
    currentExp,
    challengesCompleted,
    experienceToNextLevel,
    activeChallenge,
    resetChallenge,
    completeChallenge,
    startNewChallenge,
  } = useContext(ChallengesContext)
  const { resetCountdown } = useContext(CountdownContext)
  const [countChallenge, setCountChallenge] = useState(0)
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    if (finish === true) {
      updateUser({
        variables: {
          id: id,
          input: {
            level,
            currentXP: currentExp,
            nextLevelXP: experienceToNextLevel,
            challengesComplete: challengesCompleted,
          },
        },
      })
    }
  }, [finish, currentExp, experienceToNextLevel, challengesCompleted])

  // Função para resetar o countdown quando o usuário clicar em "falhei" ou "completei"

  function handleNextChallenge() {
    if (countChallenge < 2) {
      setCountChallenge(countChallenge + 1)
      startNewChallenge()
    } else {
      handleChallengeSucceeded()
      setFinish(true)
    }
  }

  function handleChallengeSucceeded() {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              className={styles.challengeFailedButton}
              type="button"
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              className={styles.challengeSucceededButton}
              type="button"
              onClick={handleNextChallenge}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  )
}
