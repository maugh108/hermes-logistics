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
    username: {
        type:String,
        required:false
    },
    password: {
        type: String,
        required:false
    },
    age: Number
})

export default model('User', userModel )