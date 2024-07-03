const jwt = require('jsonwebtoken')
const model = require('../Models/User') // importing model file
const userModel = model.userModel // importing model 
const storage = require('node-sessionstorage')


exports.Auth = async (req, res, next) => {
    try {
        const token = await storage.getItem('token')
        if (token) {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
            if (decodeToken) {
                const existingUser = await userModel.findOne({ _id: decodeToken.userId })
                if (existingUser) {
                    res.status(200).json({ 'user': existingUser })
                }
                else {
                    res.json({ 'user': false })
                }
            }
            else {
                res.json({ 'user': false })
            }
        }
        else {
            res.json({ 'user': false })
        }

    } catch (error) {
        res.json({'user': false})
    }

}