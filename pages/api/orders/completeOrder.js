import dbConnect from '../utils/dbConnect.js'
import Active_Order from '../../../models/Active_Order'
import CompletedOrder from '../../../models/CompletedOrder'
import User from '../../../models/User'

export default async function handler(req, res) {
    await dbConnect()
    try {
        Active_Order.find(
            {_id: req.body.orderId},
            async (err, result) => {
                if (err) {
                    res.status(500).res.send(err);
                } else {
                    let newObj = result[0];
                    console.log(newObj)
                    const newCompletedOrder = new CompletedOrder({
                        buyerId: newObj.buyerId,
                        buyerEmail: newObj.buyerEmail,
                        buyerUsername: newObj.buyerUsername,
                        shipping: newObj.shipping,
                        products: newObj.products,
                        subTotal: newObj.subTotal,
                        totalCost: newObj.totalCost,
                        dateCreated: newObj.dateCreated
                    });
                    try{
                        const savedProduct = await newCompletedOrder.save();
                        res.send(savedProduct);
                    }catch(err){
                        res.status(400).send('Error' + err);
                        res.end();
                    }
                }
            }
        );
        
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}