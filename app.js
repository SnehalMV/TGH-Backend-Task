import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import studentRouter from './controllers/studentRoutes.js'
import adminRouter from './controllers/adminRoutes.js'
import db from './utils/dbConnection.js'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))
app.use(cookieParser())
app.use('/', studentRouter)
app.use('/admin', adminRouter)

db()

app.listen(3000, () => { console.log("Connected to server"); })