import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    created_at: Date,
    updated_at: Date
})

const User = mongoose.model('User', UserSchema)

export default User

