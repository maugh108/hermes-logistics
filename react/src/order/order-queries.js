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
export const FETCH_ORDER = gql`
query findOrderById($id: String!){
  order(id: $id) {
    _id
    number
    pickup
    status
  }
}
`