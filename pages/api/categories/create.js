import dbConnect from '../utils/dbConnect.js'
import Category from '../../../models/Category'

export default async function handler(req, res) {
    await dbConnect()
    try {
        const newCategory = new Category({
            name: req.body.name,
            imgUrl: req.body.imgUrl
        });
        try{
            const savedCategory = await newCategory.save();
            res.send(savedCategory);
        }catch(err){
            res.status(400).send('Error' + err);
            res.end();
        }
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}