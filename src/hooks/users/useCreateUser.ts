import { gql, useMutation } from '@apollo/client'

interface UserInput {
  variables: {
    input: {
      name: string
      email: string
      password: string
      level: number
      currentXP: number
      nextLevelXP: number
      challengesComplete: number
    }
  }
}

const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`

export const useCreateUser = (): ((userInput: UserInput) => any) => {
  const [createUser] = useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: createUser,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  name
                  email
                  password
                  level
                  currentXP
                  nextLevelXP
                  challengesComplete
                }
              `,
            })
            return [...existingUsers, newUserRef]
          },
        },
      })
    },
  })
  return createUser
}
