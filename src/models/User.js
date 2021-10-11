import mongoose from 'mongoose'
import UserSchema from '../database/schemas/UserSchema.js'

const User = mongoose.model('User', UserSchema);

export default User

