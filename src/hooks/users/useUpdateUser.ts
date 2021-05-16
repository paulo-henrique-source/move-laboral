import { gql, useMutation } from '@apollo/client'

interface UpdateUserInput {
  variables: {
    id: number
    input: {
      level: number
      currentXP: number
      nextLevelXP: number
      challengesComplete: number
    }
  }
}

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      level
      currentXP
      nextLevelXP
      challengesComplete
    }
  }
`

export const useUpdateUser = (): ((
  updateUserInput: UpdateUserInput
) => any) => {
  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: updateUser,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  name
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
  return updateUser
}
