import client from '../database/mongodb.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt, { decode } from 'jsonwebtoken'

// GET list
export async function index(req, res){
    try {
        const users = await User.find()
        
        res.status(200).json({ users })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Error' })
    }    
}

// POST Create
export async function create(req, res){
    try{
        const { name, email, password } = req.body
        
        if(!name){
            res.status(500).json({ error: "O nome é obrigatório" })
            return
        }

        if(!email){
            res.status(500).json({ error: "O e-mail é obrigatório" })
            return
        }

        if(!password){
            res.status(500).json({ error: "A senha é obrigatória" })
            return
        }
        const encryptPass = await bcrypt.hash(password, 10) //encrypta a senha

        await User.create({
            name,
            email,
            password: encryptPass
        })

        res.status(201).json({ success: 'Usuário criado com sucesso!' })

    }catch(error){
        res.status(500).json({ error: 'Erro ao criar usuário' })
    }
}

// GET Show
export async function show(req, res){
    const _id = req.params._id
    try{
        const user = await User.findOne({ _id })
        if(user){
            res.status(200).json({ user })
            return
        }
        
        res.status(500).json({ error: 'Usuário não encontrado' })
        return

    }catch(error){
        res.status(500).json({ error: 'Usuário não encontrado' })
    }
}

// PUT Edit
export async function update(req, res){
    const _id = req.params._id
    const { name, email, password } = req.body

    try{
        const updatedUser = await User.updateOne({ _id }, { name, email, password })
        
        if(updatedUser.matchedCount === 0){
            res.status(500).json({ error: 'Erro ao atualizar usuário.' })
            return
        }
        res.status(200).json({ success: 'Usuário atualizado com sucesso.' })
        
    }catch(error){
        res.status(500).json({ error: 'Erro ao atualizar usuário.' })
    }
}

// DELETE Delete
export async function destroy(req, res){
    const _id = req.params._id

    try{
        const user = await User.findOne({ _id })

        if(!user){
            res.status(500).json({ error: 'Usuário não encontrado.' })
            return
        }

        await User.deleteOne({ _id })

        res.status(200).json({ success: 'Usuário removido com sucesso.' })
        
    }catch(error){
        res.status(500).json({ error: 'Erro ao remover usuário.' })
    }
}

//Authenticate routes
export async function auth(req, res){
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email })
        
        if(!user){
            res.status(401).json({ error: 'Usuário não encontrado.' })
            return
        }

        const match = await bcrypt.compare(password, user.password)
        
        if(match){ //caso a senha bata, retorna o token com o id do usuário
            const { _id } = user
            const access_token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 /*tempo de validade do token*/ })
            res.status(200).json({ auth: true, access_token, expires_in: 60 * 60 })
            return
        }

        res.status(401).json({ error: "Usuário ou senha não encontrada." })
        return

    }catch(error){
        res.status(500).json({ error })
    }
}

export async function me(req, res){
    try{
        //pega os dados do Bearer token
        const bearerHeader = req.headers['authorization']
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        jwt.verify(bearerToken, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) return res.status(401).json({ error: 'Não autenticado.'})
            req._id = decoded._id
        })

        //caso seja um token válido, retorna os dados do usuário logado
        const user = await User.findOne({ _id: req._id })
        
        if(user){
            res.status(200).json({ user, access_token: bearerToken })
            return
        }  

        res.status(401).json({ error: 'Token inválido.' })
        return

    }catch(error){
        res.status(401).json({ error: 'Token inválido.' })
        return
    }
    
}

export async function refresh(req, res){
    //gera outro token
    try{
        const access_token = jwt.sign({ _id: req._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 /*tempo de validade do token*/ })
        res.status(200).json({ auth: true, access_token, expires_in: 60 * 60 })
        return
    }catch(error){
        res.status(401).json({ error: 'Token inválido.' })
        return
    }
}