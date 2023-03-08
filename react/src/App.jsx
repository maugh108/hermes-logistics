import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import Persons from './Persons'

const USERS = gql`
  query {
     users{
      _id
      firstName
      age
     }
  }
`
function App() {
  const {data, error, loading} = useQuery(USERS)
  return (
    <div className="App">
      {loading ? 
      <p>Loading....</p>
      : (
        <>
          <h1>Graph + React</h1>
          <Persons persons={data?.users} />
        </>
      )  
    }
    </div>
  )
}

export default App
