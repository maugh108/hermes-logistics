import { task } from './sample' 
import User from './models/User'
import Order from './models/Order';
import Trailer from './models/Trailer';
import Truck from './models/Truck';
import Driver from './models/Driver';
import jwt from 'jsonwebtoken'
import config from './config/auth.config'
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
            const users = await User.find()
            return users
        },
        orders: async () => {
            return await Order.find().populate('trailer').populate('truck').populate('drivers')
        },
        trucks: async () => {
            return await Truck.find()
        },
        order: async (root, args) => {
            const {id} = args
            const order = await Order.findById(id)
            return order
        },
        trailers: async () => {
            return await Trailer.find()
        },
        drivers: async () => {
            return await Driver.find()
        }
    },
    Mutation: {
        createTask(_, { input }){
            input._id = task.length
            task.push(input)
            return input
        },
        async createUser(_, { input }){
            let user = await User.findById(input.id)
            if(!user) user = new User()
                user.firstName = input.firstName
                user.lastName = input.lastName
                user.username = input.username
                user.password = await User.encryptPassword(input.password)
                user.age = input.age
            await user.save()
            const token = jwt.sign({id: user._id}, config.SECRET,{
                expiresIn: 86400 //24hrs
            })
            return user
        },
        async login(_, {input}){
            const user = await User.findOne({username: input.username})
            if(!user) throw new Error('Cannot Find User');
            const matchPassword = await User.comparePassword(input.password, user.password)
            if(!matchPassword) throw new Error('Incorrect Password');
            const token = jwt.sign({id: user._id}, config.SECRET,{
                expiresIn: 86400 //24hrs
            })
            return {token:token}
        },
        async createOrder(_, {input}){
            let order = await Order.findById(input.id)
            if(!order) order = new Order()  
            const trailer = await Trailer.findById(input.trailerId)
            const truck = await Truck.findById(input.truckId)
            const drivers = await Driver.find({'_id':{$in: input.driversIds}})
            order.number = input.number
            order.pickup = input.pickup
            order.status = input.status 
            order.trailer = trailer
            order.truck = truck
            order.drivers = drivers
            await order.save()
            return order
        },
        async deleteOrder  (_, {input}) {
            const id = input
            const order = await Order.findByIdAndDelete(id)
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
        },
        async createTruck(_, {input}){
            let truck = await Truck.findById(input.id)
            if(!truck) truck = new Truck(input)
            else{
                truck.name = input.name
                truck.brand = input.brand
                truck.number = input.number
            }
            await truck.save()
            return truck
        },
        async createDriver(_, {input}){
            let driver = await Driver.findById(input.id)
            if(!driver) driver = new Driver(input)
            else{
                driver.firstName = input.firstName
                driver.lastName = input.lastName
            }
            await driver.save()
            return driver
        },
        async deleteTrailer  (_, {input}) {
            const id = input
            const trailer = await Trailer.findByIdAndDelete(id)
            return trailer
        },
        async deleteUser (_, {input}){
            const id = input
            const user = await User.findByIdAndDelete(id)
            return user
        },
        async deleteTruck(_, {input}){
            const id = input
            const truck = await Truck.findByIdAndDelete(id)
            return truck
        },
        async deleteDriver(_, {input}){
            const id = input
            const driver = await Driver.findByIdAndDelete(id)
            return driver
        }
    }
};