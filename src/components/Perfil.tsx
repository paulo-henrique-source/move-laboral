import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { name, level } = useContext(ChallengesContext)
  return (
    <div>
      <div className={styles.profileContainer}>
        <img src="/user.jpg" alt="Gabriel CoGUMm" />
        <div>
          <strong>{name}</strong>
          <p>
            <img src="icons/level.svg" alt="Level" />
            Level {level}
          </p>
        </div>
      </div>
    </div>
  )
}
