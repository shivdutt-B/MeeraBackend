const mongoose = require('mongoose');
const {Schema} = mongoose

const productSchema = new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:String
    },
    discountPercentage:{
        type:String
    },
    rating:{
        type:String
    },
    stock:{
        type:String
    },
    weight:{
        type:Number
    },
    dimensions: {
        type:Object
    },
    warrantyInformation: {
        type: String
    },
    shippingInformation: {
        type: String
    },
    reviews: {
        type: Array
    }, 
    returnPolicy: {
        type: String
    }, 
    brand:{
        type:String
    },
    category:{
        type:String
    },
    thumbnail:{
        type:String
    },
    images:{
        type:Array
    },
    count :{
        type:Number,
        default:1
    },
    orderQnt: {
        type:Number,
        default: 1
    }
})

exports.productModel = mongoose.model('product', productSchema)     