var User = require("../models/user.js");

userProvider = function () {
    this.getUsers = function (callback) {
        User.find(function (err, users) {
            callback(err, users);
        });
    };

    this.getUserById = function (userId, callback) {
        User.findById(userId, function (err, user) {
            callback(err, user);
        });
    };

    this.updateUser = function (userId, user, callback) {
        User.update({ _id: userId }, user, function (err, user) {
            callback(err, user);
        });
    };

    this.getUserByEmail = function (email, callback) {
        User.findOne({ email: email }, function (err, user) {
            callback(err, user);
        });
    }

    this.createUser = function (email, userName, password, callback) {
        User.create({
            name: userName,
            email: email,
            password: password
        },
            function (err, user) {
                callback(err, user)
            });
    }
}

exports.userProvider = userProvider;