'use strict';
const Order = require('../../models').Order;
const httpStatus = require( 'http-status' );
const jwt = require( 'jsonwebtoken' );
const config = require( '../../utils/config' );
const productCtrl = require('../controllers/product.controller');

/**
 * Load order by id and append to req.
 */
function load(req, res, next, id) {
  Order.findById(id)
    .then((order) => {
      req.order = order;
      return next();
    })
    .catch(e => next(e));
}
/**
* Get order
* @returns {Order}
*/
function get(req, res) {
  if ( req.order === null ) {
    return res.status( httpStatus.NOT_FOUND ).json();
  }
  else {
    return res.status( httpStatus.FOUND ).json( req.order );
  }
}

/**
 * Get all orders
 * @returns {Order}
 */
function getAll(req, res) {
  var userId = jwt.decode( req.headers.authorization.split(' ')[1], config.jwtSecret).userId;
  var admin = jwt.decode( req.headers.authorization.split(' ')[1], config.jwtSecret).admin;
  if ( admin ) {
    Order.find({ })
      .then( (results) => res.status( httpStatus.OK ).json( results ) )
      .catch( (error) => res.status( httpStatus.BAD_GATEWAY ).json( error ) );
  }
  else {
    Order.find({ user: userId })
      .then( (results) => res.status( httpStatus.OK ).json( results ) )
      .catch( (error) => res.status( httpStatus.BAD_GATEWAY ).json( error ) );
  }
}

/**
* Create new order
* @property {string} req.body.name - The name of order.
* @property {string} req.body.category - The category of order.
* @property {string} req.body.gender - The gender of order.
* @property {string} req.body.price - The price of order.
* @property {string} req.body.orderVariants - The variants of a order.
* @returns {Order}
*/

function create(req, res, next) {
  var userId = jwt.decode( req.headers.authorization.split(' ')[1], config.jwtSecret).userId;
  productCtrl.calculateOrderPrice(req.body.entries)
    .then( (calculatedPrice) => {
      const order = new Order({
        user: userId,
        entries: req.body.entries,
        totalPrice: calculatedPrice,
        status: 'AWAITING'
      });

      order.save()
        .then(savedOrder => res.json(savedOrder))
        .catch(e => next(e));
    })
    .catch();
}

/**
* Update existing order
* @property {string} req.body.name - The name of order.
* @property {string} req.body.category - The category of order.
* @property {string} req.body.gender - The gender of order.
* @property {string} req.body.price - The price of order.
* @property {string} req.body.orderVariants - The variants of a order.
* @returns {Order}
*/
// function update(req, res, next) {
//   const order = req.order;
//   order.name = req.body.name;
//   order.category = req.body.category;
//   order.gender = req.body.gender;
//   order.price = req.body.price;
//   order.orderVariants = req.body.orderVariants;
//   order.save()
//     .then(savedOrder => res.json(savedOrder))
//     .catch(e => next(e));
// }

module.exports = { load, get, getAll, create };
