const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

});
module.exports = moongoose.model('User',userSchema);