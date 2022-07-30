require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRouter = require('./router/auth')
const todoRouter = require('./router/todo')
const categoryRouter = require('./router/category')
const errorMiddleware = require('./middlewares/error-middleware')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static(process.env.STATIC_PATH))
app.use('/api/auth', authRouter)
app.use('/api/todos', todoRouter)
app.use('/api/category', categoryRouter)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(process.env.PORT, () => console.log(`Server has been started on ${process.env.PORT}`))
  } catch (e){
    console.log(e)
  }
}

start()