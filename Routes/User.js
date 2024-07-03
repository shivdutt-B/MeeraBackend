const express = require('express');
const route = express.Router()
const userController = require('../Controllers/User')

route.post('/signin', userController.signIn)
route.post('/signup', userController.signUp)
route.get('/logout', userController.logOut)
route.post('/delete', userController.deleteAccount)
route.post('/address', userController.address)
route.post('/addToOrder', userController.addToOrders)
exports.userRouter = route     