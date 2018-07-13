var express = require('express');
var router = express.Router();

var productService = new (require('../service/productService.js')).productService();

/* GET products listing. */
router.get('/', function(req, res, next) {

    productService.getProducts(function (err, products) {
        if (err) {
            return res.status(500).send({message:"There was a problem finding the products."});
        }
        res.status(200).send({'response':products});        
    })
});

module.exports = router;
