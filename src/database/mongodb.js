import mongoose from 'mongoose';
import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://houpa2:Houpa666@cluster0.rcuye.mongodb.net/houpa?retryWrites=true&w=majority";

//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const client = await mongoose.connect(uri)

export default client