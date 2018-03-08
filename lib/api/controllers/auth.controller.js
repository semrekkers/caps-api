const jwt = require( 'jsonwebtoken' );
const httpStatus = require( 'http-status' );
const APIError = require( '../../utils/helpers/APIError' );
const config = require( '../../utils/config' );
const User = require( '../../models' ).User;

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  User.findOne({ email: req.sanitize(req.body.email) })
    .then((userFound) => {
      if (req.sanitize(req.body.email) === userFound.email && userFound.comparePassword(req.sanitize(req.body.password)) && userFound.wrongPasswordCount > 3) {
        const token = jwt.sign({
          userId: userFound._id,
          admin: userFound.admin
        }, config.jwtSecret);
        return res.json({
          token
        });
      }
      else {
        User.findById( userFound._id )
          .then( (user)  => {
            user.wrongPasswordCount++;
            user.save();
          })
        const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
        return next(err);
      }
    })
    .catch(e => next(e));
}

module.exports = { login };
