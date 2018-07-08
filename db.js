var mongoose = require('mongoose');


var mongoDB = 'mongodb://admin:neutrinos123@ds129821.mlab.com:29821/neutrinos-product';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));