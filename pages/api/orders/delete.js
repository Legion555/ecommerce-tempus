import dbConnect from '../utils/dbConnect.js'
import Active_Order from '../../../models/Active_Order'

export default async function handler(req, res) {
    await dbConnect()
    try {
        Active_Order.findByIdAndDelete(req.query.orderId)
        .then(response => {
            res.send('successfull deleted')
        }).catch(error => console.log(error))
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}