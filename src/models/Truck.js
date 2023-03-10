import { Schema, model } from 'mongoose'

const truckModel = new Schema({
    name: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        required:true
    },
    number: {
        type: String,
        required: true
    }
})

export default model('Truck', truckModel )