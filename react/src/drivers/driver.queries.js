import { gql } from "@apollo/client"
export const FETCH_DRIVERS = gql`
  query {
     drivers{
      _id
      firstName
      lastName
     }
  }
`