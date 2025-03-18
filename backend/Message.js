import { Schema, model } from "mongoose";

// defines how each message should look
const messageSchema = new Schema({
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minLength:5,
        maxLength: 500
    },
    created_at: {
        type: Date,
        default: ()=>Date.now(),
        immutable: true,
    }
})

//creates model
const Message = model('Message', messageSchema)

export default Message;