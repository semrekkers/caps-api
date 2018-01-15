'use strict';
const mollie = require( '../../utils/mollie' );
const Order = require('../../models').Order;
const jwt = require( 'jsonwebtoken' );
const config = require( '../../utils/config' );
const httpStatus = require( 'http-status' );
const APIError = require( '../../utils/helpers/APIError' );

/**
* Create a new payment URL
* @property {number} req.body.amount - The amount of the payment.
* @property {string} req.body.description - The description of the payment.
* @property {string} req.body.redirectUrl - The redirect url of the payment.
* @property {string} req.body.webhookUrl - The webhook url of the payment.
* @returns {Product}
*/
function create(req, res, next) {
  var userId = jwt.decode( req.headers.authorization.split(' ')[1], config.jwtSecret).userId;
  Order.findById(req.body[0].orderId)
    .then((order) => {
      if ( order.user.toString() === userId )
      {
        mollie.payments.create({
          amount:      order.totalPrice,
          description: 'CAPS Order '+ order.id,
          redirectUrl: req.body[0].redirectUrl,
          webhookUrl:  config.mollieWebhookUrl
        }, function (payment) {
          res.status(httpStatus.CREATED).json({ url: payment.getPaymentUrl() });
        });
      }
    })
    .catch();
}

function webhook (req, res, next) {
  res.status( httpStatus.OK );
}

/**
* Update a payment when webhook is called
* @property {number} req.body.amount - The amount of the payment.
* @property {string} req.body.description - The description of the payment.
* @property {string} req.body.redirectUrl - The redirect url of the payment.
* @property {string} req.body.webhookUrl - The webhook url of the payment.
* @returns {Product}
*/
function update(req, res, next) {
  //TODO: UPDATE ORDER TO CHANGE PAYMENT STATUS
  res.json({ updated: true });
}

module.exports = { create, update, webhook };
