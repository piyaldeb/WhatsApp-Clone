const mongoose = require('mongoose');

const IndividualMessage = require('../models/IndividualMessage');
const { ObjectId } = require('mongoose');

// FUNCTION sendIndividualMessage(request, response)
//   EXTRACT receiverId and content FROM request.body
//   SET senderId TO request.user.id
  
//   TRY
//     CREATE new message OBJECT with senderId, receiverId, and content
//     SAVE message TO database
//     RETURN message AS JSON response
//   CATCH error
//     LOG error message TO console
//     RETURN 'Server error' WITH status code 500
// END FUNCTION
exports.sendIndividualMessage= async(req,res)=>{
    const{reciverId , content}=req.body;
    const senderId = req.user.id;
    try{
        const message = new IndividualMessage({
            sender:senderId,
            receiver:reciverId,
            content,
        });
        await message.save();
        return res.json(message);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}

// FUNCTION getIndividualMessages(request, response)
//   EXTRACT receiverId FROM request.params
//   SET senderId TO request.user.id
  
//   TRY
//     QUERY database FOR messages WHERE (senderId IS sender AND receiverId IS receiver) OR (senderId IS receiver AND receiverId IS sender)
//     SORT messages BY createdAt IN descending order
//     RETURN messages AS JSON response
//   CATCH error
//     LOG error message TO console
//     RETURN 'Server error' WITH status code 500
// END FUNCTION

exports.getIndividualMessage = async(req,res)=>{
    const { receiverId } = req.params;
        
    const senderId = req.user._id;
    console.log("sender:", senderId)
    console.log("Reciver:",receiverId)
    try{
        const message = await IndividualMessage.find({
            $or:[
                {sender:senderId,reciver:receiverId},
                {sender:receiverId,reciver:senderId},
            ]
        }).sort({createdAt:-1});
        console.log(message)
        return res.json(message);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
};