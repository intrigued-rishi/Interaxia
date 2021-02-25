const express = require('express'); 
const friendController = require('../controllers/friend_controller');

const router = express.Router();

router.get('/add/:id',friendController.add);

router.get('/remove/:id',friendController.remove);

module.exports = router;