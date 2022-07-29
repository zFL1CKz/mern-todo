require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRouter = require('./router/auth')
const todoRouter = require('./router/todo')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api', todoRouter)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
  } catch (e){
    console.log(e)
  }
}

start()