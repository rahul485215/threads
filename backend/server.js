import express from 'express'
import dotenv from "dotenv"
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import {v2 as cloudinary} from 'cloudinary'
import { app, server } from './socket/socket.js'
import path from 'path'



dotenv.config()
connectDB()

const __dirname = path.resolve()
const PORT = process.env.PORT || 5000

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


//to parse json data in the req.body
app.use(express.json({limit:"50mb"}))

//to parse form data in the req.body
app.use(express.urlencoded({extended: true}))

//get the cookie from the request and then set the cookie in the response
app.use(cookieParser())

//Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/messages', messageRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*',(req,res) =>{
	res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})


server.listen(PORT, ()=>{
    console.log(`Server started at  http://localhost:${PORT}`)
})