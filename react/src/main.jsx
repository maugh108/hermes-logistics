import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql'
  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </BrowserRouter>,
)
