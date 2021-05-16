export interface Login {
  id?: string
  email: string
  password: string
  name?: string
  level?: number
  currentXP?: number
  nextLevelXP?: number
  challengesComplete?: number
}
