import { gql } from "@apollo/client"
export const CREATE_TRAILER = gql`
  mutation addTrailer( $id: String, $number: String!, $type: String! ) {
    createTrailer(input:{id:$id, number:$number, type:$type})
    {
      number
      type
    }
    
  }
`
export const DELETE_TRAILER = gql`
  mutation removeTrailer( $id: String!) {
    deleteTrailer(input:{id:$id})
    {
      number
      type
    }
    
  }
`