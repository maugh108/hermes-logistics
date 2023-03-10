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
    trucks: [Truck]
    drivers: [Driver]
}

type Mutation { 
    createTask(input: TaskInput): Task
    createUser(input: UserInput): User 
    createOrder(input: OrderInput): Order
    deleteOrder(input: DeleteKeywords): Order
    createTrailer(input: TrailerInput): Trailer
    deleteTrailer(input: DeleteKeywords): Trailer
    deleteUser(input: DeleteKeywords): User
    createTruck(input: TruckInput): Truck
    createDriver(input: DriverInput): Driver
    deleteDriver(input: DeleteKeywords): Driver
    deleteTruck(input: DeleteKeywords): Truck
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
    status: String!,
    trailer: Trailer,
    truck: Truck,
    drivers: [Driver]
}
type Truck { 
    _id: ID,
    name: String!,
    brand: String!
    number: String!
}
type Trailer{
    _id: ID,
    number: String!,
    type: String!
}
type Driver{
    _id: ID,
    firstName: String!,
    lastName: String
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
    status: String!,
    trailerId: String!,
    truckId:String!,
    driversIds: [String]
}
input TrailerInput{
    id: String,
    number:String!,
    type: String!
}
input TruckInput {
    id:String,
    name:String!,
    brand:String!,
    number:String!
}
input DriverInput{
    id:String,
    firstName: String!,
    lastName: String!
}
`;

export default typeDefs