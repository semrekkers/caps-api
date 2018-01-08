const express = require('express');
const paymentCtrl = require('../controllers/payment.controller');
// const orderCtrl = require('../controllers/order.controller');
const expressJwt = require( 'express-jwt' );
const config = require( '../../utils/config' );

const router = express.Router();

router.route('/')
/** POST /api/payment - Create new product */
  .post(expressJwt({ secret: config.jwtSecret }), paymentCtrl.create);

router.route('/callback/:orderId')
/** PUT /api/payment/callback/:orderId - Update product */
  .put(expressJwt({ secret: config.jwtSecret }), paymentCtrl.update);

/** Load product when API with orderId route parameter is hit */
// router.param('orderId', paymentCtrl.load);

module.exports = router;
