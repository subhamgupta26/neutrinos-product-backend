var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    name: {type: String, required: true, max: 100},
    products : [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  }
);

module.exports = mongoose.model('User', UserSchema);