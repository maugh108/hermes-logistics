import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
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

userModel.statics.encryptPassword = async (password) => {
    const salt  = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
userModel.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model('User', userModel )