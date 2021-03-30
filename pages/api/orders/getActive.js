import dbConnect from '../utils/dbConnect.js'
import Active_Order from '../../../models/Active_Order'

export default async function handler(req, res) {
    await dbConnect()
    try {
        Active_Order.find( 
            { },
            (err, result) => {
                if (err) {
                    res.status(500).res.send(err);
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