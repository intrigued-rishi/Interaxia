const express = require('express')
const router = express.Router();
const controller = require('../controllers/chatsController');

router.get('/friend/:to',controller.chatter);
router.post('/save',controller.save);

module.exports=router;