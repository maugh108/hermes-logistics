import { gql } from "@apollo/client"
export const CREATE_ORDER = gql`
  mutation addOrder( $id: String, $number: String!, $pickup: String!, $status: String!, $trailerId: String!, $truckId: String!, $driversIds: [String]!) {
    createOrder(input:{id:$id, number:$number, pickup:$pickup, status:$status, trailerId:$trailerId, truckId:$truckId, driversIds:$driversIds})
    {
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