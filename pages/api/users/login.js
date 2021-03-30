import dbConnect from '../utils/dbConnect.js'
import User from '../../../models/User'

export default async function handler(req, res) {
    await dbConnect()
    try {
        //Check if email exists
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.send('email not found');

        //Validate password
        let bcrypt = require('bcryptjs');        
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.send('password is invalid');
        
        //Create and assigning token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.send({status: 'success', userData: {...user._doc, authToken: token}});
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}