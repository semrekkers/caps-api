'use strict';
const mollie = require( '../../utils/mollie' );
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
  const newPayment = mollie.payments.create({
    amount:      req.body.amount,
    description: req.body.description,
    redirectUrl: req.body.redirectUrl,
    webhookUrl:  req.body.webhookUrl
  }, function (payment) {
    res.status(httpStatus.CREATED).json({ url: payment.getPaymentUrl() });
  });
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

module.exports = { create, update };
