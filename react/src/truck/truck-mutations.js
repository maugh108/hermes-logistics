import { gql } from "@apollo/client"
export const CREATE_TRUCK = gql`
  mutation addTruck( $id:String, $name: String!, $brand: String!, $number: String! ) {
    createTruck(input:{id:$id, name:$name, brand:$brand, number:$number})
    {
        _id
        name
        brand
        number
    }
    
  }
`

export const DELETE_TRUCK = gql`
  mutation removeTruck( $id: String!) {
    deleteTruck(input:{id:$id})
    {
        _id
        name
        brand
        number
    }
    
  }
`