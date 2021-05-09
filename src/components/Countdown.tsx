import { useContext, useEffect } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const {
    hours,
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext)

  // Formatando o tempo para mostrar de uma maneira diferente.
  // Retornando apenas o "primeiro" e o "segundo" número da hora.
  const [hourLeft, hourRight] = String(hours).padStart(2, '0').split('')
  // Retornando apenas o "primeiro" e o "segundo" número do minuto.
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  // Retornando apenas o "primeiro" e o "segundo" número do segundo.
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  useEffect(() => {
    startCountdown()
  })

  useEffect(() => {
    if (secondRight && secondLeft === '0') {
      resetCountdown()
    }
  })

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{hourLeft}</span>
          <span>{hourRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span id="secondLeft">{secondLeft}</span>
          <span id="secondRight">{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button type="button" className={styles.countdownButton}>
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  )
}
