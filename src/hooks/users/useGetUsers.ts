import { gql, useQuery } from '@apollo/client'
import { User } from '../../schemas/user'

const GET_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      password
      level
      currentXP
      nextLevelXP
      challengesComplete
    }
  }
`

export const useGetUsers = (): User[] | undefined => {
  const { data } = useQuery(GET_USERS)
  return data
}
