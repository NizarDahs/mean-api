var Restaurant = require('../models/restaurants');


exports.getAllRestaurants = function (req, res) {
    Restaurent.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                sucess: false,
                error: err

            })
        } else {
            res.status(200).json({
                sucess: true,
                restaurents: data
            })
        }


    });
}


exports.AddRestaurant = function (req, res) {
    var restautent = new Restaurant({
        nom: req.body.nom,
        position: {
            lat: req.body.lat,
            long: req.body.long
        },
        image: req.body.image,
        plats: [req.body.Plat]
    })
    restautent.save(function (err) {
        
        if (err) {
            res.status(500).json({
                success: false,
                error: 'cant add restaurant to database',
                err: err
            })
        } else {
            res.status(200).json({
                success: true,
                new: restautent
            })
        }
    });
}


exports.getRestautantById = function (req, res) {
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
                    message: 'database not found',
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