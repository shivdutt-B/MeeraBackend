const express = require('express');
const route = express.Router()

const Auth = require('../Middleware/Auth')

route.get('/auth', Auth.Auth)

exports.AuthRouter = route