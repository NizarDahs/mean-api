var Plat = require('../models/plats');
exports.getAllPlats = function (req, res) {
    Plat.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                sucess: false,
                error: err
                
            })
        }else {
                res.status(200).json({
                    sucess: true,
                    plats:data
                })
            }
        
        
    });
}


exports.AddPlat = function (req, res) {
    var plat = new Plat({
        nom: req.body.nom,
        ingredient: req.body.ingredient,
        prix: req.body.prix
    })
    plat.save(function (err) {
        console.log(err);
        if (err) {
            res.status(500).json({
                success: false,
                error: 'cant add to database',
                err:err
            })
        } else {
            res.status(200).json({
                success: true,
               new: plat
            })
        }
    });
}