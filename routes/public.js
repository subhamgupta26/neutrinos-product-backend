var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


// var User = require('../models/user');

var userService = new (require('../service/userService.js')).userService();


/* GET users listing. */
router.post('/signup', function (req, res, next) {
  userService.getUserByEmail(req.body.email,function(err,user){
    if(user){
      return res.status(400).send({ message: "Email already exist." });
    }
    else{
  
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);


  userService.createUser(req.body.email, req.body.name, hashedPassword,function(err, user){
      if (err) {
        return res.status(500).send({ message: "There was a problem adding the information to the database." });
      }
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });    
  });
    }
  });
});


router.post('/login', function (req, res, next) {


  userService.getUserByEmail(req.body.email, function (err, currentUser) {
    if (err) {
      return res.status(500).send({ message: "There was a problem finding the user." });
    }
    if (!currentUser) {
      return res.status(404).send({ message: "User doesnot exist." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, currentUser.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null, message: 'Username and password doesnt match' });
    }
    var token = jwt.sign({ id: currentUser._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
});


module.exports = router;
