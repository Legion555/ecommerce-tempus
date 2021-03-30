import dbConnect from '../utils/dbConnect.js'
import User from '../../../models/User'



export default async function handler(req, res) {
    await dbConnect()
    try {
        //Check if username already exists
        const usernameExist = await User.findOne({username: req.body.username});
        if(usernameExist) return res.send('username already exists');

        //Check if email already exists
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.send('email already exists');

        //Hash the password
        let bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        try{
            const saveUser = await newUser.save();
            res.send('success');
        }catch(err){
            res.status(400).send('Error' + err);
            res.end();
        }
    } catch (error) {
        res.status(400).json({ success: false })
        res.end();
    }
}