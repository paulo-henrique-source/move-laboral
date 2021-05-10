import { useContext, useState } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const {
    hours,
    minutes,
    seconds,
    hasFinished,
    isActive,
    handleSearchClient,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext)

  // Formatando o tempo para mostrar de uma maneira diferente.
  // Retornando apenas o "primeiro" e o "segundo" número do minuto.
  const [hoursLeft, hoursRight] = String(hours).padStart(2, '0').split('')

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  // Retornando apenas o "primeiro" e o "segundo" número do segundo.
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      {isActive ? (
        <div className={styles.countdownContainer}>
          <div>
            <span>{hoursLeft}</span>
            <span>{hoursRight}</span>
          </div>
          <span>:</span>
          <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
          </div>
          <span>:</span>
          <div>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
          </div>
        </div>
      ) : (
        <div className="timerDiv">
          <label className="timerLabel" htmlFor="time">
            Insira o tempo do ciclo.
          </label>
          <br />
          <input
            className="timerInput"
            name="time"
            id="time"
            type="time"
            placeholder="Exemplo: 1:25"
            onChange={handleSearchClient}
          />
        </div>
      )}

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
            <>
              <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
              >
                Iniciar um ciclo
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}
