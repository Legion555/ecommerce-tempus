import dbConnect from '../utils/dbConnect.js'
import User from '../../../models/User'
import mongoose  from 'mongoose';


export default async function handler(req, res) {
    await dbConnect()
    try {
      User.updateOne(
          { _id: req.body.buyerId },
          { $pull: { activeOrders: { id: mongoose.Types.ObjectId(req.body.orderId) } } }, 
              {multi: true},
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          }
        );
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}