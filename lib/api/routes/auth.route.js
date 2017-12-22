const express = require( 'express' );
const expressJwt = require( 'express-jwt' );
const authCtrl = require( '../controllers/auth.controller' );
const config = require( '../../utils/config' );

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(authCtrl.login);

module.exports = router;
