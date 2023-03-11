import { gql } from "@apollo/client"
export const CREATE_USER = gql`
  mutation addUser( $id:String, $firstName: String!, $lastName: String!, $age: Int, $username:String!, $password: String! ) {
    createUser(input:{id:$id, firstName:$firstName, lastName:$lastName, age:$age, username:$username, password:$password})
    {
      _id
      firstName
      lastName
      age
      username
      password
    }
    
  }
`
export const LOGIN = gql`
  mutation makeLogin( $username: String!, $password: String!) {
    login(input:{username:$username, password:$password})
    {
      token
    }
    
  }
`

export const DELETE_USER = gql`
  mutation removeUser( $id: String!) {
    deleteUser(input:{id:$id})
    {
      firstName
      lastName
      username
      password
    }
    
  }
`