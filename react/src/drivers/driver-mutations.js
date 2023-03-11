import { gql } from "@apollo/client"
export const CREATE_DRIVER = gql`
  mutation addDriver( $id: String, $firstName: String!, $lastName: String! ) {
    createDriver(input:{id:$id, firstName:$firstName, lastName:$lastName})
    {
      firstName
      lastName
    }
    
  }
`
export const DELETE_DRIVER = gql`
  mutation removeDriver( $id: String!) {
    deleteDriver(input:{id:$id})
    {
      firstName
      lastName
    }
    
  }
`