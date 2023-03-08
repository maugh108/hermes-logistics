import { task } from './sample' 
import User from './models/User'
export const resolvers = { 
    Query: {
        hello: () => {
            return 'Hello World From GraphQl'
        },
        greet: (root, args) => {
            const {name} = args
            return `Hello ${name}`
        },
        tasks:() => {
            return task
        },
        users: async () => {
            return await User.find()
        },
        orders: async () => {
            return await Order.find()
        },
        trailers: async () => {
            return await Trailer.find()
        }
    },

    Mutation: {
        createTask(_, { input }){
            input._id = task.length
            task.push(input)
            return input
        },
        async createUser(_, { input }){
            const user = new User(input)
            await user.save()
            return user
        },
        async createUser(_, { input }){
            console.log(input)
            let user = await User.findById(input.id)
            if(!user) user = new User(input)
            else{
                user.firstName = input.firstName
                user.lastName = input.lastName
                user.username = input.username
                user.password = input.password
                user.age = input.age
            }
            await user.save()
            return user
        },
        async createOrder(_, {input}){
            let order = await Order.findById(input.id)
            if(!order) order = new Order(input)
            else{
                order.number = input.number
                order.pickup = input.pickup
                order.status = input.status
            }
            await order.save()
            return order
        },
        async createTrailer(_, {input}){
            let trailer = await Trailer.findById(input.id)
            if(!trailer) trailer = new Trailer(input)
            else{
                trailer.number = input.number
                trailer.type = input.type
            }
            await trailer.save()
            return trailer
        }
    }
};