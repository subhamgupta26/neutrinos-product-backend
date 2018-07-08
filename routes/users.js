var express = require('express');
var router = express.Router();

var User = require('../models/user');

var Product = require('../models/product');

/* GET users listing. */

router.get('/', function(req, res, next) {

      User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});



router.get('/:userId/cart', function(req, res, next) {

      User.findById(req.params.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        Product.find({'_id':{ $in: user.products }}, function (err, products) {
        if (err) return res.status(500).send("There was a problem finding the product.");
        if (!products) return res.status(404).send("No product found.");          
        res.status(200).send(products);
        });
    });
});

router.put('/:userId/updatecart', function(req, res, next) {
        User.findById(req.params.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        if(user.products.includes(req.body._id)){
          return res.status(400).send("This product is already in cart.");
        }
        user.products.push(req.body._id);
        User.update(user,function (err, user) {
          if (err) return res.status(500).send("There was a problem updating the cart.");
          if (!user) return res.status(404).send("Updation failed");
          res.status(200).send("Update Successful!!");
        });
        
    });
});

router.get('/:userId/logout', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;
