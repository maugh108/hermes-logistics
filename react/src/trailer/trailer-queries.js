import { gql } from "@apollo/client"
export const FETCH_TRAILERS = gql`
query{
  trailers {
    _id
    number
    type
  }
}
`