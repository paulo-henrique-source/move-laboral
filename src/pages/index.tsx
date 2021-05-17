import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import md5 from 'md5'
import { useRouter } from 'next/router'
import { useLogin } from '../hooks/users/useLogin'

import { FaUserAlt, FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useCreateUser } from '../hooks/users/useCreateUser'

import Input from '../components/Input'

import Swal from 'sweetalert2'

const Dashboard: React.FC = () => {
  const createUser = useCreateUser()
  const router = useRouter()
  const [isLoggin, setIsLoggin] = useState<boolean>(true)
  const [emailInput, setEmailInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const login = useLogin(emailInput, md5(passwordInput))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login !== undefined) {
      sessionStorage.setItem('fix', emailInput)
      sessionStorage.setItem('dix', md5(passwordInput))
      router.push('/dashboard')
    } else {
      Swal.fire('Ops...', 'Usuario ou senha invalido!', 'error')
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    try {
      createUser({
        variables: {
          input: {
            name: name,
            email: email,
            password: md5(password),
            level: 1,
            currentXP: 0,
            nextLevelXP: 16,
            challengesComplete: 0,
          },
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      Swal.fire(
        'Bom trabalho!',
        'Você criou seu usuario com sucesso!',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('fix')) {
      router.push('/dashboard')
    }
    if (sessionStorage.getItem('dix')) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Move.it</title>
      </Head>
      <div
        className={
          isLoggin ? 'masterContainer' : 'masterContainer sign-up-mode'
        }
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
                onChange={(event) => setPasswordInput(event.target.value)}
                value={passwordInput}
              />
              <input type="submit" value="Login" className="btn solid" />
            </form>
            <form action="/" className="sign-up-form" onSubmit={handleRegister}>
              <div className="modalCard">
                <div className="fields">
                  <h2 className="title">Cadastre-se</h2>

                  <Input
                    icon={<FaUserAlt />}
                    placeholder="Nome Completo"
                    type="text"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                  />
                  <Input
                    icon={<MdEmail />}
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                  <Input
                    icon={<FaLock />}
                    placeholder="Senha"
                    type="password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                  />

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
              <p>Cadastre-se agora mesmo para começar seus exercicios.</p>
              <button
                className="btn transparent"
                onClick={() => {
                  setIsLoggin(false)
                }}
              >
                Cadastre-se
              </button>
              <img src="/log3.svg" className="image" />
            </div>
          </div>
          <div className="panel right-panel">
            <div className="masterContent">
              <h3>Possui uma Conta ?</h3>
              <p>Entre agora mesmo e comece a praticar ginastica laboral.</p>
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
    </>
  )
}

export default Dashboard
