'use strict';
const Product = require('../../models').Product;
const httpStatus = require( 'http-status' );

/**
 * Load product by id and append to req.
 */
function load(req, res, next, id) {
  Product.findById(id)
    .then((product) => {
      req.product = product;
      return next();
    })
    .catch(e => next(e));
}

/**
* Get product.
* @returns {Product}
*/
function get(req, res) {
  if ( req.product === null ) {
    return res.status( httpStatus.NOT_FOUND ).json();
  }
  else {
    return res.status( httpStatus.OK ).json( req.product );
  }
}

/**
 * Get all products
 * @returns {Product}
 */
function getAll(req, res) {
  Product.find({})
    .then( (results) => res.status( httpStatus.OK ).json( results ) )
    .catch( (error) => res.status( httpStatus.BAD_GATEWAY ).json( error ) );
}

/**
* Create new product.
* @property {string} req.body.name - The name of product.
* @property {string} req.body.category - The category of product.
* @property {string} req.body.gender - The gender of product.
* @property {string} req.body.price - The price of product.
* @property {string} req.body.sizes - The size of a product.
* @property {string} req.body.colors - The color of a product.
* @property {string} req.body.imageUrl - The imageUrl's of a product.
* @returns {Product}
*/

function create(req, res, next) {
  const product = new Product({
    name: req.sanitize(req.body.name),
    category: req.sanitize(req.body.category),
    gender: req.sanitize(req.body.gender),
    price: req.sanitize(req.body.price),
    sizes: req.sanitize(req.body.sizes),
    colors: req.sanitize(req.body.colors),
    imageUrl: req.sanitize(req.body.imageUrl)
  });

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}

/**
* Update existing product.
* @property {string} req.body.name - The name of product.
* @property {string} req.body.category - The category of product.
* @property {string} req.body.gender - The gender of product.
* @property {string} req.body.price - The price of product.
* @property {string} req.body.sizes - The size of a product.
* @property {string} req.body.colors - The color of a product.
* @property {string} req.body.imageUrl - The imageUrl's of a product.
* @returns {Product}
*/
function update(req, res, next) {
  // TODO: Check if product is found.
  const product = req.product;
  product.name = req.sanitize(req.body.name);
  product.category = req.sanitize(req.body.category);
  product.gender = req.sanitize(req.body.gender);
  product.price = req.sanitize(req.body.price);
  product.sizes = req.sanitize(req.body.sizes);
  product.colors = req.sanitize(req.body.colors);
  product.imageUrl = req.sanitize(req.body.imageUrl);
  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}
/**
 * Delete product.
 * @returns {Product}
 */
function remove(req, res, next) {
  // TODO: Check if product is found.
  const product = req.product;
  product.remove()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

/**
 * Calculate total price of an order.
 * @param {OrderEntry} orderEntries
 */
function calculateOrderPrice( orderEntries ) {
  var promises = [];
  orderEntries.forEach( entry => {
    promises.push( Product.findById( entry.product ) );
  });
  return Promise.all(promises)
    .then((products) => {
      var orderTotal = 0;
      for(var i = 0; i < products.length; i++){
        orderTotal += products[i].price * orderEntries[i].quantity;
      }
      return Math.round( orderTotal * 100 ) / 100;
    });
}

module.exports = { load, get, getAll, create, update, remove, calculateOrderPrice };
