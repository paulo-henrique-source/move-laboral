import React, { createContext, useState, useContext } from 'react'

interface AuthContextState {
  id: string
  name: string
  email: string
  level: number
  currentXP: number
  nextLevelXP: number
  challengesComplete: number
  setId: any
  setName: any
  setEmail: any
  setLevel: any
  setCurrentXP: any
  setNextLevelXP: any
  setChallengesComplete: any
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState)

export default function AuthProvider({ children }) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [level, setLevel] = useState(0)
  const [currentXP, setCurrentXP] = useState(0)
  const [nextLevelXP, setNextLevelXP] = useState(0)
  const [challengesComplete, setChallengesComplete] = useState(0)

  return (
    <AuthContext.Provider
      value={{
        id,
        name,
        email,
        level,
        currentXP,
        nextLevelXP,
        challengesComplete,
        setId,
        setName,
        setEmail,
        setLevel,
        setCurrentXP,
        setNextLevelXP,
        setChallengesComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useCount must be used within a AuthProvider')
  const {
    id,
    name,
    email,
    level,
    currentXP,
    nextLevelXP,
    challengesComplete,
    setId,
    setName,
    setEmail,
    setLevel,
    setCurrentXP,
    setNextLevelXP,
    setChallengesComplete,
  } = context
  return {
    id,
    name,
    email,
    level,
    currentXP,
    nextLevelXP,
    challengesComplete,
    setId,
    setName,
    setEmail,
    setLevel,
    setCurrentXP,
    setNextLevelXP,
    setChallengesComplete,
  }
}
