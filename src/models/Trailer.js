import { Schema, model } from 'mongoose'

const trailerModel = new Schema({
    number: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
})

export default model('Trailer', trailerModel )