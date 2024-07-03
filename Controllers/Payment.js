const model = require('../Models/User') // importing model file
const userModel = model.userModel // importing model 
const storage = require('node-sessionstorage')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const userController = require('../Controllers/User');

exports.payment = async (req, res) => {
    try {
        const { itemsToOrder, userId } = req.body
        await storage.setItem('tempOrder', { itemsToOrder, userId })


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: itemsToOrder.map(item => {
                const discountedPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: Math.round(parseFloat(discountedPrice) * 100),
                    },
                    quantity: item.count,
                };
            }),
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/failed`,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

async function addToOrder(userId, products) {
    const user = await userModel.findById(userId)
 
    products.forEach(async incomingItem => {
        const existingOrder = user.order.find(orderItem => orderItem._id == incomingItem._id);

        if (existingOrder) {
            await userModel.findOneAndUpdate(
                { '_id': userId, 'order._id': incomingItem._id }, // Query condition
                { $inc: { 'order.$.orderQnt': incomingItem.orderQnt } }, // Update operation: $inc to increment orderQnt
                { new: true } // Options: return the updated document
            )
        } else {
            user.order.push(incomingItem);
        }
    });
    const savedUser = await user.save()
}


const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET

exports.stripeWebHook = async (request, response) => {
    // Body is already parsed as the parsing function is installed at the main server. So don't need to add any parser on this endpoint.
    let event = request.body;

    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.rawBody,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log('SIGN VERFICATION FAILED')
            return response.sendStatus(400);
        }
    }

    if (event.type == 'checkout.session.completed'){
        console.log('SESSION COMPLETED')
        const orders = await storage.getItem('tempOrder')
        // console.log('temp', orders.userId, orders.itemsToOrder)
        const fp =  await addToOrder(orders.userId, orders.itemsToOrder)
        console.log('fp', fp)
        // Return a 200 response to acknowledge receipt of the event
        response.json({ status: 'haa bhai ho giya' });
    }
};
