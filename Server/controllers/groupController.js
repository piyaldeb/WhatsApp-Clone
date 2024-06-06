const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
    const { name, memberIds } = req.body;
    console.log('Request Body:', req.body); // Log the request body for debugging
    console.log('Name:', name); // Log the group name
    console.log('Member IDs:', memberIds); // Log the member IDs

    try {
        const users = await User.find({ '_id': { $in: memberIds } });

        if (users.length !== memberIds.length) {
            // Find which memberIds are invalid
            const invalidIds = memberIds.filter(id => !users.some(user => user._id.equals(id)));
            console.error('Invalid member IDs:', invalidIds);
            return res.status(400).json({ error: 'Invalid member IDs', invalidIds });
        }
        const group = new Group({
            name,
            members: memberIds
        });
        const check=group.members.push(req.user.id);
        console.log(check)
        await group.save();
        console.log('Group saved:', group); // Log the saved group object
        res.json(group);
    } catch (err) {
        console.error('Error creating group:', err.message); // Log any errors
        res.status(500).send('Server error');
    }
}

exports.renameGroup = async(req,res)=>{
    const{groupId,newName}=req.body;
    try{
        const group = await Group.findById(groupId);
        if(!group) return res.status(404).json({ msg: 'Group not found' });
        group.name=newName;
        await group.save();
        res.json(group);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }


    }
exports.blockUser = async(req,res)=>{
    const{userIdToBlock}=req.body;
    const userId=req.user.id;
    try{
        const blockedUserAvailable = await User.findById(userIdToBlock);
        if(!blockedUserAvailable) return res.json("No user");
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        if(!user.blockedUsers.includes(userIdToBlock)){
            user.blockedUsers.push(userIdToBlock);
            await user.save();
        }
        res.json(user.blockedUsers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}