import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { currentExp, experienceToNextLevel } = useContext(ChallengesContext)

  const percentToNextLevel =
    Math.round(currentExp * 100) / experienceToNextLevel

  return (
    <div className="headerNav">
      <div>
        <header className={styles.experienceBar}>
          <span>{currentExp} xp</span>
          <div>
            <div style={{ width: `${percentToNextLevel}%` }} />
          </div>
          <span>{experienceToNextLevel} xp</span>
        </header>
      </div>
    </div>
  )
}
