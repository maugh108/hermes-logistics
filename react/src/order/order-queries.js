import { gql } from "@apollo/client"
export const FETCH_ORDERS = gql`
query{
  orders {
    _id
    number
    pickup
    status
    trailer{
      _id
      number
      type
    }
    truck{
      _id
      name
      brand
      number
    }
    drivers{
      _id
      firstName
      lastName
    }
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