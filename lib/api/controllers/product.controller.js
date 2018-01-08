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
* Get product
* @returns {Product}
*/
function get(req, res) {
  return res.json(req.product);
}

/**
 * Get all products
 * @returns {Product}
 */
function getAll(req, res) {
  Product.find({})
    .then(function (e) {
      return  res.status(httpStatus.CREATED).json(e);
    })
    .catch((error) => {
      return  res.status(httpStatus.NOT_FOUND).json(error);
    });
}

/**
* Create new product
* @property {string} req.body.name - The name of product.
* @property {string} req.body.category - The category of product.
* @property {string} req.body.gender - The gender of product.
* @property {string} req.body.price - The price of product.
* @property {string} req.body.productVariants - The variants of a product.
* @returns {Product}
*/

function create(req, res, next) {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    gender: req.body.gender,
    price: req.body.price,
    productVariants: req.body.productVariants,
  });

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}

/**
* Update existing product
* @property {string} req.body.name - The name of product.
* @property {string} req.body.category - The category of product.
* @property {string} req.body.gender - The gender of product.
* @property {string} req.body.price - The price of product.
* @property {string} req.body.productVariants - The variants of a product.
* @returns {Product}
*/
function update(req, res, next) {
  const product = req.product;
  product.name = req.body.name;
  product.category = req.body.category;
  product.gender = req.body.gender;
  product.price = req.body.price;
  product.productVariants = req.body.productVariants;
  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}
/**
 * Delete product.
 * @returns {Product}
 */
function remove(req, res, next) {
  const product = req.product;
  product.remove()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

module.exports = { load, get, getAll, create, update, remove };
