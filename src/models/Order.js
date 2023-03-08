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
    }
})

export default model('Order', orderModel )