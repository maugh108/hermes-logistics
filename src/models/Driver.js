import { Schema, model } from 'mongoose'

const driversModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
})

export default model('Drivers', driversModel )