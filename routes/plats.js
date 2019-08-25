var express = require('express');
var router = express.Router();
var platController = require('../controller/plat');


router.get('/', platController.getAllPlats);
router.post('/add', platController.AddPlat);

module.exports = router;