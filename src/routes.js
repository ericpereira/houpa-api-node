import express from 'express'
import { index as indexUser } from './controllers/UsersController.js'

const routes = express.Router()

routes.get('/', function(req, res){
    return indexUser(req, res)
})

export default routes