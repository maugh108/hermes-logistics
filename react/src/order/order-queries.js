import { gql } from "@apollo/client"
export const FETCH_ORDERS = gql`
query{
  orders {
    _id
    number
    pickup
    status
  }
}
`