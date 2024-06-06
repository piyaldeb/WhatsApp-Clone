require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// module.exports = async(req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) {
//         console.error('No token provided');
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.user;
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             console.error('User not found');
//             return res.status(401).json({ msg: 'User not found' });
//         }
//         next();
//     } catch (err) {
//         console.error('Token verification failed:', err.message);
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// };
module.exports = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            // const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded)
            // const user = await User.findById(decoded.id).select('-password');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            const user = await User.findById(req.user.id);
            console.log(user)
            if (!user) {
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            req.user = user;
            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({
                message: 'Not authorized, token failed'
            });
        }
    }
};
