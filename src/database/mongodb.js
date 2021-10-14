import mongoose from 'mongoose'
import {} from 'dotenv/config'

console.log()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rcuye.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const client = mongoose.connect(uri)

export default client