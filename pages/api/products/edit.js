import dbConnect from '../utils/dbConnect.js'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    await dbConnect()
    try {
        Product.findOneAndUpdate(
            { _id: req.body._id },
            { $set: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                category: req.body.category,
                imgUrl: req.body.imgUrl
                }
            }
        )
        .then(response => {
            res.send('success')
        }).catch(error => console.log(error))
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}