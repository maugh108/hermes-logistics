import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type Query {
        hello: String
        greet(name: String!): String,
        tasks: [Task]
        users: [User]
    }

    type Mutation { 
        createTask(input: TaskInput): Task
        createUser(input: UserInput): User 
    }
    type User{ 
        _id: ID,
        firstName: String!,
        lastName: String!,
        age: Int
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
        firstName: String!,
        lastName: String!,
        age: Int
    }
`;

export default typeDefs