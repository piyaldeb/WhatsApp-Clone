const mongoose = require('mongoose');

const connectdb =async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connected")    
} catch (err) {
    console.error(err.message);
    process.exit(1);
}
};

module.exports = connectdb;