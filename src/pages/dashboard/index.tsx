import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ChallengeBox } from '../../components/ChallengeBox'
import { CompletedChallenges } from '../../components/CompletedChallenges'
import { Countdown } from '../../components/Countdown'
import { ExperienceBar } from '../../components/ExperienceBar'
import { Profile } from '../../components/Perfil'
import { ChallengesProvider } from '../../contexts/ChallengesContext'
import { CountdownProvider } from '../../contexts/CountdownContext'

import styles from '../../styles/pages/Home.module.css'

interface HomeProps {
  level: number
  currentExp: number
  challengesCompleted: number
}

export default function Home(props: HomeProps) {
  const router = useRouter()

  function handleLogout() {
    sessionStorage.clear()
    router.push('/')
  }

  if (router.isFallback) {
    return <div>loading...</div>
  } else {
    return (
      <ChallengesProvider
        level={props.level}
        currentExp={props.currentExp}
        challengesCompleted={props.challengesCompleted}
      >
        <div className="back">
          <div className={styles.container}>
            <Head>
              <title>Move.it</title>
            </Head>
            <div className="top-right-gradient"></div>
            <div className="headerNav">
              <div>
                <ExperienceBar />
              </div>
              <div className="buttonContent">
                <button onClick={handleLogout} className="buttonLogout">
                  Logout
                </button>
              </div>
            </div>

            <CountdownProvider>
              <section>
                <div className="profileCard">
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </div>
        </div>
      </ChallengesProvider>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Recuperando os dados do cookie.
  const { level, currentExp, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExp: Number(currentExp),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}
