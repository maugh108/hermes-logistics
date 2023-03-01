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
        }
    }
};