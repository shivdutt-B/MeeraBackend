const userModel = require('../Models/User').userModel
const jwt = require('jsonwebtoken')
const storage = require('node-sessionstorage')

exports.addToCart = async (req, res) => {
    try {
        const token = storage.getItem('token')
        const user = await jwt.verify(token, process.env.JWT_SECRET) // Got user id here
        let product = req.body
        const updatedData = await userModel.findByIdAndUpdate((user.userId), {
            $push: {
                cart: product
            }
        }, { new: true })
        res.status(200).json({'success':true, 'length':updatedData.cart.length})

    } catch (error) {
        res.status(200).json({'success':false})
    }
}

exports.removeFromCart = async (req, res) => {
    try {
        const token = storage.getItem('token')
        const user = await jwt.verify(token, process.env.JWT_SECRET)
        const updateData = await userModel.findByIdAndUpdate((user.userId), {
            $pull: {
                cart: { _id: req.body._id }
            }
        }, { new: true })
        res.status(200).json({"success": true, 'length':updateData.cart.length })
    }
    catch(error){
        res.status(200).json({ 'success': false})
    }
}

exports.increaseItem = async (req, res) => {
    try{
        const token = storage.getItem('token')
        const user = await jwt.verify(token, process.env.JWT_SECRET)
        const resp = await userModel.findOneAndUpdate({ _id: user.userId, "cart._id": req.body.productId }, { $inc: { "cart.$.count": 1 } }, { new: true });
        res.json({success:true}) // send success either true or false then on front end use success to update the data in the context states
    } catch(error) {
        res.json({success: false})
    }
}

exports.dItem = async (req, res) => {
    try{
        const token = storage.getItem('token')
        const user = await jwt.verify(token, process.env.JWT_SECRET)
        const resp = await userModel.findOneAndUpdate({ _id: user.userId, "cart._id": req.body.productId }, { $inc: { "cart.$.count": -1 } }, { new: true });
        res.status(200).json({success: true})
    } catch (error) {
        res.json({success: false})
    }
}

exports.removeFromOrder = async (req, res) => {
    try {
        const token = storage.getItem('token')
        const user = await jwt.verify(token, process.env.JWT_SECRET)
        const productId = req.body.productId
        const updatedData = await userModel.findByIdAndUpdate((user.userId), {
            "$pull": {
                "order": { _id: productId }
            }
        }, { new: true })
        res.status(200).json({ 'success': true})
    } catch (error) {
        res.json({success: false})
    }
}