var express = require('express');
var router = express.Router();

var Product = require('../models/product');

/* GET productss listing. */
router.get('/', function(req, res, next) {
 // res.send('respond with a resource');

       Product.find({}, function (err, products) {
        if (err) return res.status(500).send("There was a problem finding the products.");
        res.status(200).send(products);
    });
});

module.exports = router;
