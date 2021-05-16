import { gql, useQuery } from '@apollo/client'
import { Login } from '../../schemas/login'

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export const useLogin = (email, password): Login | undefined => {
  const { data } = useQuery(LOGIN, {
    variables: { email, password },
  })
  return data?.login[0]
}
