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
  var paymentId = undefined;
  Order.findById(req.body.orderId)
    .then((order) => {
      mollie.payments.create({
        amount:      order.totalPrice,
        description: 'CAPS Order '+ order.id,
        redirectUrl: req.body.redirectUrl,
        webhookUrl:  config.mollieWebhookUrl
      }, function (payment) {
        order.paymentId = payment.id;
        order.save()
          .then(() => res.status(httpStatus.CREATED).json({ url: payment.getPaymentUrl() }))
          .catch(e => next(e));
      });
    })
    .catch();
}

function webhook (req, res, next) {
  console.log(req.body);
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
