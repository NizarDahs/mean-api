var express = require('express');
var router = express.Router();
var platController = require('../controller/plat');


router.get('/', platController.getAllPlats);
router.post('/add', platController.AddPlat);
router.get('/get/:id', platController.getPlatById);
router.put('/update/:id', platController.updatePlat);
router.delete('/delete/:id', platController.deletePlat);

module.exports = router;