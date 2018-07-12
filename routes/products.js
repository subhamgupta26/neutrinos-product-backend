var express = require('express');
var router = express.Router();

// var Product = require('../models/product');
// var VerifyToken = require('../auth/VerifyToken');

var productService = new (require('../service/productService.js')).productService();

/* GET products listing. */
router.get('/', function(req, res, next) {
 // res.send('respond with a resource');

    //    Product.find({}, function (err, products) {
    //     if (err) return res.status(500).send({message:"There was a problem finding the products."});
    //     res.status(200).send({'response':products});
    // });
    productService.getProducts(function (err, products) {
        if (err) {
            return res.status(500).send({message:"There was a problem finding the products."});
        }
        res.status(200).send({'response':products});        
    })
});

module.exports = router;
