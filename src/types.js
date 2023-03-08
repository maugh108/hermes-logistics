import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type Query {
        hello: String
        greet(name: String!): String
        tasks: [Task]
        users: [User]
        orders: [Order]
        order(id: String!): Order
        trailers: [Trailer]
    }

    type Mutation { 
        createTask(input: TaskInput): Task
        createUser(input: UserInput): User 
        createOrder(input: OrderInput): Order
        deleteOrder(input: DeleteKeywords): Order
        createTrailer(input: TrailerInput): Trailer
        deleteTrailer(input: DeleteKeywords): Trailer
        deleteUser(input: DeleteKeywords!): User
    }
    type User{ 
        _id: ID,
        firstName: String!,
        lastName: String!,
        username: String!,
        password: String!,
        age: Int
    }
    type Order {
        _id: ID,
        number: String!,
        pickup: String!,
        status: String!
    }
    type Trailer{
        _id: ID,
        number: String!,
        type: String!
    }
    type Task { 
        _id: ID,
        title: String!,
        description: String!,
        number: Int
    }

    input TaskInput { 
        title: String!,
        description: String!,
        number: Int
    }
    input UserInput{ 
        id: String,
        firstName: String!,
        lastName: String!,
        username: String!,
        password: String!,
        age: Int
    }
    input DeleteKeywords{
        id: String!
    }
    input OrderInput{
        id: String,
        number: String!,
        pickup: String!,
        status: String!
    }
    
    input TrailerInput{
        id: String
        number:String!,
        type: String!
    }
`;

export default typeDefs