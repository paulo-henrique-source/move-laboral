import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://graphql-mongose.herokuapp.com/',
  cache: new InMemoryCache(),
})

export default client
