var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


var User = require('../models/user');

/* GET users listing. */
router.post('/signup', function(req, res, next) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

      User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");

             var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
            res.status(200).send({ auth: true, token: token });
        });
});


router.post('/login', function(req, res, next) {

  //res.send('respond with a resource');

        User.findOne({email : req.body.email}, function (err, currentUser ) {
        if (err) {
          return res.status(500).send({message:"There was a problem finding the user."});
        }
        if(!currentUser){
          return res.status(404).send({message:"User doesnot exist."});
        }
        //console.log(currentUser);
        // if(currentUser.password !== req.body.password ){
        //   return res.status(401).send("Username or password incorrect");
        // }

            var passwordIsValid = bcrypt.compareSync(req.body.password, currentUser.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: currentUser._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

        res.status(200).send({ auth: true, token: token });
    });
});


module.exports = router;
