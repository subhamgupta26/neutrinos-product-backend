var express = require('express');
var router = express.Router();

// var User = require('../models/user');

// var Product = require('../models/product');

var _ = require('underscore');

var userService = new (require('../service/userService.js')).userService();
var productService = new (require('../service/productService.js')).productService();

// var VerifyToken = require('../auth/VerifyToken');

/* GET users listing. */

router.get('/', function(req, res, next) {
  // User.find({}, function(err, users) {
  //   if (err){
  //     console.log(err);
  //     return res.status(500).send('There was a problem finding the users.');
  //   }
  //   res.status(200).send(users);
  // });

  userService.getUsers(function(err, users) {
    if (err) {
      console.log(err);
      return res.status(500).send('There was a problem finding the users.');
    }
    res.status(200).send(users);
  });
});

router.get('/:userId/cart', function(req, res, next) {
  // User.findById(req.params.userId, function(err, user) {
  //   if (err)
  //     return res.status(500).send('There was a problem finding the user.');
  //   if (!user) return res.status(404).send('No user found.');
  //   Product.find({ _id: { $in: user.products } }, function(err, products) {
  //     if (err)
  //       return res.status(500).send('There was a problem finding the product.');
  //     if (!products) return res.status(404).send('No product found.');
  //     res.status(200).send({'response':products});
  //   });
  // });
  userService.getUserById(req.params.userId, function(err, user) {
    if (err) {
      return res.status(500).send('There was a problem finding the user.');
    }
    if (!user) {
      return res.status(404).send('No user found.');
    }
    productService.getProductsFromIds(user.products, function(err, products) {
      if (err) {
        return res.status(500).send('There was a problem finding the product.');
      }
      if (!products) {
        return res.status(404).send('No product found.');
      }
      res.status(200).send({ response: products });
    });
  });
});

router.put('/:userId/updatecart', function(req, res, next) {
  console.log('inside user update cart');
  // User.findById(req.params.userId, function(err, user) {
  //   if (err) {
  //     console.log(err);
  //     return res
  //       .status(500)
  //       .send({ message: 'There was a problem finding the user.' });
  //   }
  //   if (!user) return res.status(404).send({ message: 'No user found.' });
  //   if (user.products.indexOf(req.body._id) > -1) {
  //     return res
  //       .status(400)
  //       .send({ message: 'This product is already in cart.' });
  //   }
  //   user.products.push(req.body._id);
  //   User.update({ _id: user.id }, user, function(err, user) {
  //     if (err) {
  //       console.log(err);
  //       return res
  //         .status(500)
  //         .send({ message: 'There was a problem updating the cart.' });
  //     }
  //     if (!user) return res.status(404).send({ message: 'Updation failed' });
  //     res.status(200).send({ message: 'Update Successful!!' });
  //   });
  // });

  userService.getUserById(req.params.userId, function(err,user){
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: 'There was a problem finding the user.' });
    }
    if (!user) {
      return res.status(404).send({ message: 'No user found.' });
    }
    if (user.products.indexOf(req.body._id) > -1) {
      return res
        .status(400)
        .send({ message: 'This product is already in cart.' });
    }
    user.products.push(req.body._id);    

    userService.updateUser(user.id, user ,function(err, user){
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ message: 'There was a problem updating the cart.' });
      }
      if (!user) {
        return res.status(404).send({ message: 'Updation failed' });
      }
      res.status(200).send({ message: 'Update Successful!!' });      
    });
  });
});


router.get('/current', function(req, res, next) {
  // console.log(req.userId);
  // User.findById(req.userId, function(err, user) {
  //   if (err) {
  //     console.log(err);
  //     return res
  //       .status(500)
  //       .send({ message: 'There was a problem finding the user.' });
  //   }
  //   if (!user) return res.status(404).send({ message: 'No user found.' });
  //   res.status(200).send(user);
  // });

  userService.getUserById(req.userId, function(err, user){
        if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: 'There was a problem finding the user.' });
    }
    if (!user) {
      return res.status(404).send({ message: 'No user found.' });
    }
    res.status(200).send(user);
  });
});

module.exports = router;
