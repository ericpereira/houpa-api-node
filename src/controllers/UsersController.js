import client from '../database/mongodb.js'
import User from '../models/User.js'

export async function index(req, res){
    try {
        const newUser = new User({
            name: "Eririririr",
            password: "senha"
        })

        newUser.save()

        const users = await User.find()

        res.send({ sucess: 'Usuário criado com sucesso', users })
    } catch (error) {
        console.log(error)
        res.status(400)
        res.send({ error: 'Error' })
    }
    
}
