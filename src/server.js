import express from 'express'
import cors from 'cors'
import routes from './routes.js'

const app = express()

app.use(cors()) //configura o server para utilizar cors
app.use(express.json()) //para entender o json no body
app.use(routes)

app.listen(3333)