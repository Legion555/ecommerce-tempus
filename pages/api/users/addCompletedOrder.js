import dbConnect from '../utils/dbConnect.js'
import User from '../../../models/User'
import mongoose  from 'mongoose';


export default async function handler(req, res) {
    await dbConnect()
    try {
        User.updateOne(
            {_id: req.body.buyerId},
            {$push: {
                completedOrders: {
                    id: req.body.id,
                    dateCompleted: req.body.dateCompleted
                    }
                }
            },
            (err, result) => {
                if (err) {
                    res.send(err);
                    res.end();
                } else {
                    res.send(result)
                    res.end();
                }
            }
        )
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}