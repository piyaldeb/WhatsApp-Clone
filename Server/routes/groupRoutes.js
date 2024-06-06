const express = require('express');
const router = express.Router();
const { createGroup, renameGroup, blockUser } = require('../controllers/groupController');
const auth = require('../middlewares/authMiddleware');

router.post('/create', auth, createGroup);
router.put('/rename', auth, renameGroup);
router.put('/block', auth, blockUser);

module.exports = router;