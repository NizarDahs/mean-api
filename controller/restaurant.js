var Restaurant = require('../models/restaurants');


exports.getAllRestaurants = function (req, res) {
    Restaurant.find({}, (err, data) => {
        /* tester existance de restaurants pour les affiche */
        if (err) {
            res.status(500).json({
                sucess: false,
                error: err

            })
        }
        /* le test d'existance des restaurants et les affiche  */
        else {
            res.status(200).json({
                sucess: true,
                restaurents: data
            })
        }


    });
}

/* ajouter nouveau restaurant */
exports.AddRestaurant = function (req, res) {
    /* reservation un reastaurant pour les stock la suivante */
    var restautent = new Restaurant({
        nom: req.body.nom,
        position: {
            lat: req.body.lat,
            long: req.body.long
        },
        image: req.body.image,
        plats: req.body.plats
    })
    restautent.save(function (err) {
        /* s il le sauvgarde impossible maitre l'erreur 500 */
        if (err) {
            res.status(500).json({
                success: false,
                error: 'cant add restaurant to database',
                err: err
            })
        }
        /* le sauvgarde tous juste */
        else {
            res.status(200).json({
                success: true,
                new: restautent
            })
        }
    });
}

/* affichage un seul restaurant par son id */
exports.getRestautantById = function (req, res) {
    Restaurant.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                error: err,
                message: 'cannot connct database'
            })
        }
        /* ce restaurant existe et l'affiche */
        else {
            if (data) {
                res.status(200).json({
                    success: true,
                    restautent: data
                })


            }
            /* si le restaurant n'existe nous affiche le message d'erreur 500 */

            else {
                res.status(404).json({
                    success: false,
                    message: 'this restaurant is not in database',
                    restautent: data
                })
            }
        }
    })
}


exports.updateRestaurant = function (req, res) {
    Restaurant.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'cannot update',
                error: err
            })
        }
        else {
            Restaurant.findById(req.params.id, (err, data) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        error: err,
                        message: 'can not access database'
                    })
                }
                else {
                    if (data) {
                        res.status(200).json({
                            success: true,
                            restautent: data
                        })


                    }
                    else {
                        res.status(404).json({
                            success: false,
                            message: 'database not finded',
                            restautent: data
                        })
                    }
                }
            })
        }
    })

}


exports.deleteRestaurant = function (req, res) {
    Restaurant.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                error: err,
                message: 'can not access database'
            })
        }
        else {
            if (data) {
                //function remove
                Restaurant.findById(req.params.id).remove((err, data) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            error: err,
                            message: 'cannot delete plat'
                        })

                    }
                    else {
                        res.status(200).json({
                            success: true,
                            message: 'Restaurant deleted'
                        })

                    }
                })


            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'Reastaurant for delete not found',

                })
            }
        }
    })
}