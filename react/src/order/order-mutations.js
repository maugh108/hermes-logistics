import { gql } from "@apollo/client"
export const CREATE_ORDER = gql`
  mutation addOrder( $id: String, $number: String!, $pickup: String!, $status: String! ) {
    createOrder(input:{id:$id, number:$number, pickup:$pickup, status:$status})
    {
      number
      pickup
      status
    }
    
  }
`
export const DELETE_ORDER = gql`
  mutation removeOrder( $id: String!) {
    deleteOrder(input:{id:$id})
    {
      number
      pickup
      status
    }
    
  }
`