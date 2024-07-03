const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(v);
            },
            message: props => `${props.value} email is not a valid email`
        }
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type:Number,
    },
    address:{
        type:String
    },
    cart: {
        type:Array
    },
    order:{
        type:Array
    },
})

exports.userModel = mongoose.model('user', userSchema)