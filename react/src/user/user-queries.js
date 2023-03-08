import { gql } from "@apollo/client"
export const FETCH_USERS = gql`
  query {
     users{
      _id
      firstName
      lastName
      username
      password
      age
     }
  }
`