import express from 'express'
import { index, create, show, update, destroy, auth, me, refresh } from '../controllers/UsersController.js'
import jwt from 'jsonwebtoken'

const routes = express.Router()

//Middleware de autenticação
function authUser(req, res, next){
    try {
        //pega os dados do Bearer token
        const bearerHeader = req.headers['authorization']
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return res.status(401).json({ error: 'Não autenticado.'})

            req._id = decoded._id //salva na requisição o id do usuário
            next() //chama a próxima função
        })
    } catch (error) {
        res.status(401).json({ error: 'Token inválido.' })
        return false
    }
    
}

//CRUD routes
routes.get('/', authUser, async (req, res) => {
    await index(req, res)
})

routes.post('/', async (req, res) => {
    await create(req, res)
})

routes.get('/:_id', authUser, async (req, res) => {
    await show(req, res)
})

routes.put('/:_id', authUser, async (req, res) => {
    await update(req, res)
})

routes.delete('/:_id', authUser, async (req, res) => {
    await destroy(req, res)
})

//Auth routes
routes.post('/auth', async (req, res) => {
    await auth(req, res)
})

routes.post('/auth/me', authUser, async (req, res) => {
    await me(req, res)
})

routes.post('/auth/refresh', authUser, async (req, res) => {
    await refresh(req, res)
})

export default routes