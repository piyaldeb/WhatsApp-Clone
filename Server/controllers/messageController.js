const Message = require('../models/Message');
const Group = require('../models/Group')
const User = require('../models/User')

exports.sendMessage = async(req,res)=>{
    const{content,groupId}=req.body;
    const senderId = req.user._id;
    try{
        const group =await Group.findById(groupId);
        console.log(group)
        if (!group) return res.status(404).json({ msg: 'Group not found' });
        const sender= await User.findById(senderId);
        console.log(sender)
        console.log('Sender ID:', senderId);
        group.members.forEach(member => {
            console.log('Member ID:', member);
            console.log('Comparison Result:', member.equals(senderId));
            
        });
        let isMember=false;
        for (const member of group.members) {
            console.log('Member ID:', member);
            console.log('Comparison Result:', member.equals(senderId));
            
            // If a match is found, set isMember to true and break out of the loop
            if (member.equals(senderId)) {
                isMember = true;
                break;
            }
        }
        if (isMember) {
            const message = new Message({
                sender: senderId,
                content,
                group: groupId,
            });
            await message.save();
            return res.json(message);
        } else {
            return res.status(403).json({ msg: 'Not a group member' });
        }
        // if(group.members.some(member=>member.equals(sender))){
        //     const message= new Message({
        //         sender:senderId,
        //         content,
        //         group:groupId,
        //     });
        //     await message.save();
        //     return res.json(message);
        // }else{
        //     return res.status(403).json({ msg: 'Not a group member' }); 
        // }

    }catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMessages = async(req,res)=>{
    const{groupId} = req.params;
    try{
        const messages = await Message.find({group:groupId}).sort({createdAt:-1});
        res.json(messages);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}

