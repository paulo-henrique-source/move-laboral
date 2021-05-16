import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useLogin } from '../../hooks/users/useLogin'

import { FaUserAlt, FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

import Input from '../../Components/jsComponents/Input'

const Dashboard: React.FC = () => {
  const router = useRouter()
  const [isLoggin, setIsLoggin] = useState<boolean>(true)
  const [emailInput, setEmailInput] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const login = useLogin(emailInput, password)
  // const {
  //   setId,
  //   setName,
  //   setEmail,
  //   setLevel,
  //   setCurrentXP,
  //   setNextLevelXP,
  //   setChallengesComplete,
  // } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const data = login
      // setId(data.id)
      // setName(data.name)
      // setEmail(data.email)
      // setLevel(data.level)
      // setCurrentXP(data.currentXP)
      // setNextLevelXP(data.nextLevelXP)
      // setChallengesComplete(data.challengesComplete)
    } catch (error) {
      console.log(error)
    } finally {
      router.push('/')
    }
  }

  return (
    <div
      className={isLoggin ? 'masterContainer' : 'masterContainer sign-up-mode'}
    >
      <div className="forms-masterContainer">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Entrar</h2>
            <Input
              icon={<FaUserAlt />}
              placeholder="Email"
              type="email"
              name="email"
              onChange={(event) => setEmailInput(event.target.value)}
              value={emailInput}
            />
            <Input
              icon={<FaLock />}
              placeholder="Senha"
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form action="/" className="sign-up-form">
            <div className="modalCard">
              <div className="fields">
                <h2 className="title">Cadastre-se</h2>

                <Input icon={<FaUserAlt />} placeholder="Usuario" />
                <Input icon={<MdEmail />} placeholder="Email" />
                <Input icon={<FaLock />} placeholder="Senha" />

                <input type="submit" className="btn" value="Cadastrar" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-masterContainer">
        <div className="panel left-panel">
          <div className="masterContent">
            <h3>Novo aqui ?</h3>
            <p>
              Cadastre-se agora mesmo para começar seus exercicios, ou até mesmo
              perder alguns kilinhos !
            </p>
            <button
              className="btn transparent"
              onClick={() => {
                setIsLoggin(false)
              }}
            >
              Cadastre-se
            </button>
            <img src="/log.svg" className="image" />
          </div>
        </div>
        <div className="panel right-panel">
          <div className="masterContent">
            <h3>Possui uma Conta ?</h3>
            <p>
              Entre agora mesmo e confira as novidades do mundo da psicologia.
            </p>
            <button
              className="btn transparent"
              onClick={() => {
                setIsLoggin(true)
              }}
            >
              Entrar
            </button>
          </div>
          <img src="/register.svg" className="image" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
