import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 8000

//database
import mongoClient from '../backend/src/config/db.js'
mongoClient()

//middleware

app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

//router
import router from './src/userRouter/router.js'
import categoryRouter from '../backend/src/Category-router/categorRouter.js'
import tokenRouter from '../backend/src/Token-Router/TokenRouter.js'

app.use('/api/v1/user', router)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/token', tokenRouter)

app.use('/', (req, res) => {
  res.send('you have reach the ned of the  router list')
})

//categor-router

//app

app.listen(PORT, (error) => {
  if (error) {
    console.log(error)
  }
  console.log(`server is running at http://localhost:${PORT}`)
})
