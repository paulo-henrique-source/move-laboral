import '../styles/global.css'
import { useRouter } from 'next/router'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <ApolloProvider client={client}>
      <>
        {router.pathname === '/' ? (
          <Component {...pageProps} />
        ) : (
          <Component {...pageProps} />
        )}
      </>
    </ApolloProvider>
  )
}

export default MyApp
