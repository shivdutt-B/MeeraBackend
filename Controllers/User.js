const jwt = require('jsonwebtoken')
const model = require('../Models/User') // importing model file
const userModel = model.userModel // importing model 
const bcrypt = require('bcrypt')
const storage = require('node-sessionstorage')

exports.signIn = async (req, res, next) => {
    try {

        const email = await req.body.email // Getting email from body.
        const password = await req.body.password // Getting password from.

        if (email && password) {

            const existingUser = await userModel.findOne({ email: email })

            if (!existingUser) {
                res.status(200).json({ success: false })
            }

            else {
                const decryptPassword = await bcrypt.compare(password, existingUser.password)
                if (decryptPassword) {
                    const token = await jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

                    storage.setItem('token', token)
                    res.status(200).json({success: true, user: existingUser})

                }
                else {
                    res.status(200).json({ success: false })
                }
            }

        }
        else {
            res.json({ success: false})
        }

    } catch (error) {
        res.json({success: false})
    }

}


exports.signUp = async (req, res, next) => {
    try {

        const username = req.body.username // Getting username from body.
        const email = req.body.email // Getting email from body.
        const password = req.body.password // Getting password from body.
        const mobile = req.body.mobile

        if (username && email && password && mobile) {

            const existingUser = await userModel.findOne({ email: email })

            if (existingUser) {
                res.status(200).json({ success: false })
            }
            else {
                const user = await userModel(req.body)
                const SALTROUNDS = 10
                const encryptedPassword = await bcrypt.hash(user.password, SALTROUNDS)
                user.password = encryptedPassword
                await user.save()
                res.status(200).json({ success: true })

            }

        }
        else {
            res.json({success: false})
        }

    } catch (error) {
        res.json({success: false})
    }

}

exports.logOut = async (req, res, next) => {
    res.status(200).json({})
    storage.setItem('token', '')
}

exports.deleteAccount = async (req, res, next) => { 
    try{
        const user = req.body.user
        await userModel.findByIdAndDelete(user)
        storage.setItem('token', '')
        res.status(200).json({success: true})
    }
    catch(error){
        res.json({success: false})
    }
}

exports.address = async (req, res, next) => {

   try {
     const address = req.body.address
     const token = await storage.getItem('token')
     const decodeToken = await jwt.verify(token, process.env.JWT_SECRET)
     const response = await userModel.findByIdAndUpdate(decodeToken.userId, { $set: { address: address } }, { new: true })
     res.status(200).json({success: true, response})
   } catch (error) {
    res.json({success: false})
   }
}

exports.addToOrders = async (req, res) => {
    try {
        const token = await storage.getItem('token')
        const data = req.body.data;

        if (token) {
            const decodeToken = await jwt.verify(token, process.env.JWT_SECRET)
            if (decodeToken) {

                const user = await userModel.findById(decodeToken.userId)

                data.forEach(async incomingItem => {
                    const existingOrder = user.order.find(orderItem => orderItem._id == incomingItem._id);

                    if (existingOrder) {
                        await userModel.findOneAndUpdate(
                            { '_id': decodeToken.userId, 'order._id': incomingItem._id }, // Query condition
                            { $inc: { 'order.$.orderQnt': incomingItem.orderQnt } }, // Update operation: $inc to increment orderQnt
                            { new: true } // Options: return the updated document
                        )
                    } else {
                        user.order.push(incomingItem);
                    }
                });
                await user.save()
                res.status(200).json({ success: true, updData: user })
            }
        }
    } catch (error) {
        res.json({ "success": false })
    }
}