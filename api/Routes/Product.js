const express = require('express');
const route = express.Router()
const productController = require('../Controllers/Product')

route.get('/products',productController.showAll) 
route.post('/category',productController.bySearch) 
route.post('/product/search', productController.searchProducts)


exports.productRoute = route