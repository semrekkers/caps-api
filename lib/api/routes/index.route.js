'use strict';
const express = require( 'express' );
const userRoutes = require( './user.route' );
// const productRoutes = require( './product.route' );

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// TODO: mount product routes at /product
// router.use('/product', productRoutes);

module.exports = router;
