var express = require('express');
var router = express.Router();
var RestaurantController = require('../controller/restaurant');


router.get('/', RestaurantController.getAllRestaurants);
router.post('/add', RestaurantController.AddRestaurant);
router.get('/get/:id', RestaurantController.getRestautantById);
router.put('/update/:id', RestaurantController.updateRestaurant);
router.delete('/delete/:id', RestaurantController.deleteRestaurant);

module.exports = router;