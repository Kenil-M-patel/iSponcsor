require('dotenv').config()
const express = require('express')
const app = express()

const conn = require('./db')

const userRouter = require('./routes/user')

const {logReqRes} = require('./middleware')
// connection with database
conn.connctiontoMongo('mongodb://localhost:27017/iSponsor') 

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes('log.txt'))


// routes
app.use('/api/user', userRouter)


const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server started on port ${port}`))