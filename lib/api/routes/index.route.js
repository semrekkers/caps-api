'use strict';
const express = require( 'express' );
const userRoutes = require( './user.route' );
const productRoutes = require( './product.route' );
const authRoutes = require( './auth.route' );

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount product routes at /product
router.use('/product', productRoutes);

module.exports = router;
