const express = require('express')
const route = express.Router()
const cart = require('../Controllers/Cart')

route.post('/addtocart', cart.addToCart)
route.post('/removefromcart', cart.removeFromCart)
route.post('/decreaseitem', cart.dItem)
route.post('/increaseitem', cart.increaseItem)
route.post('/removefromorder',cart.removeFromOrder)

exports.cartRouter = route