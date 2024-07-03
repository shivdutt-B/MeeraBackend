// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const userRoute = require('./Routes/User')
const productRoute = require('./Routes/Product')
const AuthRouter = require('./Routes/Auth')
const cartRouter = require('./Routes/Cart')
const paymentRouter = require('./Routes/Payment')
require('dotenv').config()
const bodyParser = require('body-parser')
// const storage = require('node-sessionstorage')
// const signIn = require('./Middleware/Signin')
// const signUp = require('./Middleware/Signup')
// const Auth = require('./Middleware/Auth')
// const jwt = require('jsonwebtoken')
// const path = require('path');


// Create server
const server = express()

// Parsing the request body it's raw form for stripe webhook.
// I know this is not the place but wanted to tell you that I spend two nights on this part of code. First night I slept at 5 A.M and the other at 3 A.M. So happy to figure this out. Although its just 5 lines but it kept me up for two straight nights.
server.use(bodyParser.urlencoded({extended:false}))
server.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))

// Middlewares and routers
const corsOptions = {
  origin: 'https://meera-6tkl.vercel.app', // Allow only this origin
};
server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(userRoute.userRouter)
server.use(AuthRouter.AuthRouter)
server.use(productRoute.productRoute)
server.use(cartRouter.cartRouter)
server.use(paymentRouter.paymentRouter)

server.get('/', (req, res) => {
  res.send('Hello World!')
})


//Connecting to db
async function main() {
  await mongoose.connect(process.env.CONNECT_DB);
  console.log('DB connection established')
}
main().catch(err => console.log(err));

server.listen(8080)
