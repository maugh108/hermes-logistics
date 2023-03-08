import { gql } from "@apollo/client"
export const CREATE_ORDER = gql`
  mutation addOrder( $number: String!, $pickup: String!, $status: String! ) {
    createOrder(input:{number:$number, pickup:$pickup, status:$status})
    {
      number
      pickup
      status
    }
    
  }
`