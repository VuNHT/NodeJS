const Product = require('./dataModel');
const Product2 = require('./data2Model');

var ObjectID = require('mongodb').ObjectID;

//Simple version, without validation or sanitation


exports.getData = function (req, res) {
    Product.find(function (err, product) {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Lost Connect !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Successfully !!',
                data: product
            })
        }
    })
}

exports.addData = function (req, res) {
    Product.bulkWrite([
        {
            insertOne: {
                document: { name: req.body.name, document: req.body.document }
            }
        }
    ]);
    if (res) {
        {
            return res.status(200).send({
                success: 'true',
                message: 'Add Successfully !!',
            })
        }
    }
}

exports.deleteData = function (req, res) {
    var query = { '_id': ObjectID(req.params.id) };
    Product.deleteOne(query, function (err, resDelete) {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Lost Connect !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Delete Successfully !!',
            })
        }
    })
}

exports.editData = function (req, res) {
    var query = { '_id': ObjectID(req.params.id) };
    Product.updateOne(query, {
        $set:
            req.body
        //      {
        //     name: req.body.name,
        //     document: req.body.document,
        //     price: req.body.price
        // }
    }, (err, edit) => {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Lost Connect !!',
            })
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Edit Successfully !!',
            })
        }
    })
}

exports.getDataJoin = function (req, res) {
    Product.aggregate([
        {
            $lookup: {
                from: 'data-2',
                localField: 'name',
                foreignField: 'name',
                as: 'joinData'
            }
        }
    ], (err, resJoin) => {
        if (err) {
            return res.status(404).send({
                success: 'false',
                message: 'Lost Connect !!',
            })
        } else {
            console.log(resJoin);
            
            return res.status(200).send({
                success: 'true',
                message: 'Edit Successfully !!',
                data: resJoin
            })
        }
    })
}