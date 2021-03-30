import dbConnect from '../utils/dbConnect.js'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    await dbConnect()
    try {
        Product.findByIdAndDelete(req.query.productId)
        .then(response => {
            res.send('success')
        }).catch(error => console.log(error))
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}