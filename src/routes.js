import express from 'express'
import UserRoutes from './routes/UserRoutes.js'

const routes = express.Router()

//User routes
routes.use('/users', UserRoutes)

//Product routes

//Catalog routes

export default routes