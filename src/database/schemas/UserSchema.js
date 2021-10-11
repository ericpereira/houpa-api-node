import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    password: String
})

export default UserSchema