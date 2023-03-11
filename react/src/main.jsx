import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/color-mode'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { ApolloLink, concat, split } from 'apollo-link'
import theme from './theme'

const httpLink  = new HttpLink({
  uri: 'http://localhost:3000/graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `${token}` : "",
    },
  });
  return forward(operation);
});
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: concat(authMiddleware,httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ApolloProvider client={client}>
      <ChakraProvider theme={theme}> 
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
        </ChakraProvider>
      </ApolloProvider>
    
  </BrowserRouter>,
)
