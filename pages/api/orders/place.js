import dbConnect from '../utils/dbConnect.js'
import Active_Order from '../../../models/Active_Order'
import User from '../../../models/User'

export default async function handler(req, res) {
    await dbConnect()
    try {
        //Create new active order
        const newOrder = new Active_Order({
            buyerId: req.body.buyerId,
            buyerUsername: req.body.buyerUsername,
            buyerEmail: req.body.buyerEmail,
            shipping: req.body.shipping,
            products: req.body.products,
            subTotal: req.body.subTotal,
            totalCost: req.body.totalCost,
            status: 'pending'
        });
        try{
            const savedOrder = await newOrder.save();
            User.updateOne(
                {_id: req.body.buyerId},
                {$push: {
                    activeOrders: {
                        id: savedOrder._id,
                        dateCreated: savedOrder.dateCreated
                        }
                    }
                },
                (err, result) => {
                    if (err) {
                        res.send(err);
                        res.end();
                    } else {
                        res.send(savedOrder);
                        res.end();
                    }
                }
            )
        }catch(err){
            res.status(400).send('Error' + err);
            res.end();
        }
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}