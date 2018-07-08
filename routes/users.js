var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */

router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
      User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});



router.get('/:userId/cart', function(req, res, next) {

  //res.send('respond with a resource');

      User.findById(req.params.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user.products);
    });
});

router.put('/:userId/addtocart', function(req, res, next) {

  res.send('respond with a resource');
});

router.get('/:userId/logout', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;
