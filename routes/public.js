var express = require('express');
var router = express.Router();


var User = require('../models/user');

/* GET users listing. */
router.post('/signup', function(req, res, next) {

  //res.send('respond with a resource');

      User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});


router.post('/login', function(req, res, next) {

  //res.send('respond with a resource');

        User.findOne({email : req.body.email}, function (err, currentUser ) {
        if (err) {
          return res.status(500).send("There was a problem finding the user.");
        }
        if(!currentUser){
          return res.status(404).send("User doesnot exist.");
        }
        //console.log(currentUser);
        if(currentUser.password !== req.body.password ){
          return res.status(401).send("Username or password incorrect");
        }

        res.status(200).send({message:"Login successful!!"});
    });
});


module.exports = router;
