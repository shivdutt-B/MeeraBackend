const express = require('express')
const route = express.Router()
const payment = require('../Controllers/Payment')

route.post('/create-checkout-session', payment.payment)
route.post('/stripe_webhooks',  payment.stripeWebHook)

exports.paymentRouter = route
