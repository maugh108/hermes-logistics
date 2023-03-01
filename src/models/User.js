import { Schema, model } from 'mongoose'

const userModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: Number
})

export default model('User', userModel )