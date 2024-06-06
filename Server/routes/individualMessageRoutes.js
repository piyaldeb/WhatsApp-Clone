const express = require('express');
const router = express.Router();
const{sendIndividualMessage , getIndividualMessage} = require('../controllers/individualMessageController');
const auth = require('../middlewares/authMiddleware');

router.post('/send',auth,sendIndividualMessage);
router.get('/:reciverId',auth,getIndividualMessage)

module.exports=router;
