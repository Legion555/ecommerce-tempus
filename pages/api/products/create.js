import dbConnect from '../utils/dbConnect.js'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    await dbConnect()
    try {
        //Check if product already exists
        // const productExist = await Product.findOne({username: req.body.username});
        // if(productExist) return res.send('username already exists');

        //Create new product
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            imgUrl: req.body.imgUrl
        });
        try{
            const savedProduct = await newProduct.save();
            res.send(savedProduct);
        }catch(err){
            res.status(400).send('Error' + err);
            res.end();
        }
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}