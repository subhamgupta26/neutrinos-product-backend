var userProvider = new(require("../provider/userProvider.js").userProvider)();

userService = function () {
    this.getUsers = function (callback) {
        userProvider.getUsers(function (err, users) {
            callback(err, users);
        });
    };

    this.getUserById = function (userId,callback) {
        userProvider.getUserById(userId,function (err,user){
            callback(err,user);
        });
    };
    
    this.updateUser = function (userId, user ,callback) {
        userProvider.updateUser(userId,user,function (err , user){
            callback(err,user);
        });
    };
}

exports.userService = userService;