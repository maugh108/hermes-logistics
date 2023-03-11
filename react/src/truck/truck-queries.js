import { gql } from "@apollo/client"
export const FETCH_TRUCKS = gql`
  query {
     trucks{
      _id
      name
      brand
      number
     }
  }
`