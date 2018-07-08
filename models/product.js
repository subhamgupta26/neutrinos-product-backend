var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    imagePath: {type: String, required: true, max: 100},
    productId: {type: String, required: true, max: 100}
  }
);

module.exports = mongoose.model('Product', ProductSchema);