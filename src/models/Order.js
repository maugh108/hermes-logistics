import { Schema, model } from 'mongoose'

const orderModel = new Schema({
    number: {
        type: String,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    trailer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Trailer'
    },
    truck:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Truck'
    },
    drivers:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Drivers'
    }]
})

export default model('Order', orderModel )