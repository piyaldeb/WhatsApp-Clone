const User= require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

// function registerUser(req, res)
//   Extract name, email, and password from req.body
//   try
//     Check if user with given email exists in the database
//     if user exists
//       Return response with status 400 and message 'User already exists'

//     Create new user object with name, email, and password
//     Save new user to the database

//     Create payload with user's ID
//     Sign JWT token with payload, secret key, and expiration time
//     if error during token generation
//       throw error

//     Return response with generated token

//   catch error
//     Log error message
//     Return response with status 500 and message 'Server error'
// end function

exports.register = async(req,res)=>{
    const{name,email,password}=req.body;
    try{
        const user= await User.findOne({email});
        if(user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const newUser = new User({
            name,
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password,salt);
        await newUser.save();
         
        const payload ={user:{id:newUser.id}};
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            res.json({token});
        })


    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
};

//login
exports.login = async(req,res)=>{
    const{email , password}=req.body;
    try{
        let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) {
            console.error('Token generation failed:', err.message);
            throw err;
        }
      res.json({ token });
    });
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
};