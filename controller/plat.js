var Plat = require('../models/plats');


exports.getAllPlats = function (req, res) {
    Plat.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                sucess: false,
                error: err

            })
        } else {
            res.status(200).json({
                sucess: true,
                plats: data
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
                err: err
            })
        } else {
            res.status(200).json({
                success: true,
                new: plat
            })
        }
    });
}


exports.getPlatById = function (req, res) {
    Plat.findById(req.params.id, (err, data) => {
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
                    plat: data
                })


            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'database not finded',
                    plat: data
                })
            }
        }
    })
}


exports.updatePlat = function (req, res) {
    Plat.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'cannot update',
                error: err
            })
        }
        else {
            Plat.findById(req.params.id, (err, data) => {
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
                            plat: data
                        })


                    }
                    else {
                        res.status(404).json({
                            success: false,
                            message: 'database not finded',
                            plat: data
                        })
                    }
                }
            })
        }
    })

}
/* alt shift a */

exports.deletePlat = function (req, res) {
    Plat.findById(req.params.id, (err, data) => {
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
                Plat.findById(req.params.id).remove((err, data) => {
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
                            message: 'plat deleted'
                        })

                    }
                })


            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'plat for delete not found',

                })
            }
        }
    })
}