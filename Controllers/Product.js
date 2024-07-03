const productModel = require('../Models/Product')

exports.showAll = async (req, res) => {
    try {
        const products = await productModel.productModel.find()
        res.json({ success: true, 'products': products })
    } catch (error) {
        res.json({ success: false })
    }
}

exports.bySearch = async (req, res) => {
    try {
        const products = await productModel.productModel.find({ 'category': { $in: req.body.category } })
        res.json({ success: true, 'products': products })
    } catch (error) {
        res.json({ success: false })
    }
}

exports.searchProducts = async (req, res) => {
    try {
        const query = req.body.query
        const regex = new RegExp(query, 'i'); // 'i' for case-insensitive
        const results = await productModel.productModel.find({
            $or: [
                { title: regex },
                { description: regex },
                { category: regex }
            ]
        });
        res.status(200).json({ success: true, searchResults: results })
    } catch (err) {
        res.json({success: false})
    }
};

