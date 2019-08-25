var mongoose = require('mongoose');
var schema = mongoose.Schema;

var restaurantSchema = new schema({
    nom: String,
    position: {
        lat: Number,
        long:Number
    },
    image: String,
    plats:[String]
})

var Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;