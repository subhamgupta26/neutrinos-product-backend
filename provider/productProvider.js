var Product = require("../models/product.js");

productProvider = function () {
    this.getProducts = function (callback) {
        Product.find(function (err, products) {
            callback(err, products);
        });
    };

    this.getProductsFromIds = function (productIds,callback) {
        Product.find({ _id: { $in: productIds } }, function(err, products) {
            callback(err,products);
        });
    };
}

exports.productProvider = productProvider;