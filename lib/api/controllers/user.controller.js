'use strict';
const User = require( '../../models' ).User;
const httpStatus = require( 'http-status' );
const APIError = require( '../../utils/helpers/APIError' );
const jwt = require( 'jsonwebtoken' );
const config = require( '../../utils/config' );
const mailCtrl = require('../controllers/mail.controller');

/**
 * Load user and append to req.
 */
function load(req) {
  // console.log(req.headers.authorization);
  var userId = jwt.decode( req.headers.authorization.split(' ')[1], config.jwtSecret).userId;
  return new Promise((resolve, reject) => {
    if ( userId ) {
      User.findById(userId)
        .then((user) => {
          if ( user !== null ) {
            req.userFound = user;
            resolve();
          }
          else {
            reject();
          }
        })
        .catch(e => reject(e));
    } else {
      return reject();
    }
  });
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res, next) {
  load(req)
    .then( () => {
      return res.json(req.userFound);
    })
    .catch(() => {
      const err = new APIError( 'Data error: User not found', httpStatus.UNAUTHORIZED, true );
      return next(err);
    });
}

/**
 * Create new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.firstName - The first name of user.
 * @property {string} req.body.lastName - The last name of user.
 * @property {string} req.body.address - The address of user.
 * @property {string} req.body.city - The city of user.
 * @property {string} req.body.province - The province of user.
 * @property {string} req.body.postalCode - The postal code of user.
 * @property {string} req.body.country - The country of user.
 * @returns {User}
 */
function create(req, res, next) {
  User.findOne( { email: req.sanitize(req.body.email) } )
    .then( ( usr ) => {
      if ( usr === null ) {
        const user = new User({
          email:      req.sanitize(req.body.email),
          firstName:  req.sanitize(req.body.firstName),
          lastName:   req.sanitize(req.body.lastName),
          address:    req.sanitize(req.body.address),
          city:       req.sanitize(req.body.city),
          province:   req.sanitize(req.body.province),
          postalCode: req.sanitize(req.body.postalCode),
          country:    req.sanitize(req.body.country),
          admin:      false
        });
        user.setPassword( req.sanitize(req.body.password) );
        user.save()
          .then((savedUser) => {
            savedUser.password = undefined;
            mailCtrl.accountConfirmation(savedUser);
            res.status(httpStatus.CREATED).json( savedUser );
          })
          .catch(e => next(e));
      }
      else {
        const err = new APIError( 'Authentication error: User exists', httpStatus.UNAUTHORIZED, true );
        return next(err);
      }
    })
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.firstName - The first name of user.
 * @property {string} req.body.lastName - The last name of user.
 * @property {string} req.body.address - The address of user.
 * @property {string} req.body.city - The city of user.
 * @property {string} req.body.province - The province of user.
 * @property {string} req.body.postalCode - The postal code of user.
 * @property {string} req.body.country - The country of user.
 * @returns {User}
 */
function update(req, res, next) {
  load(req, res, next)
    .then( () => {
      const user       = req.userFound;
      // Removed option to update email of a user
      // Since this could also be a problem with duplicated accounts
      // user.email       = req.sanitize(req.body.email);
      user.firstName   = req.sanitize(req.body.firstName);
      user.lastName    = req.sanitize(req.body.lastName);
      user.address     = req.sanitize(req.body.address);
      user.city        = req.sanitize(req.body.city);
      user.province    = req.sanitize(req.body.province);
      user.postalCode  = req.sanitize(req.body.postalCode);
      user.country     = req.sanitize(req.body.country);

      user.save()
        .then((savedUser) => {
          savedUser.password = undefined;
          res.status(httpStatus.ACCEPTED).json(savedUser);
        })
        .catch(e => next(e));
    })
    .catch(() => {
      const err = new APIError( 'Data error: Update failed', httpStatus.BAD_REQUEST, true );
      return next(err);
    });
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  // TODO: Add load function.
  const user = req.user;
  user.remove()
    .then(deletedUser => res.status(httpStatus.ACCEPTED).json(deletedUser))
    .catch(e => next(e));
}

function lostPassword(req, res, next) {
  var userEmail = req.userEmail;

  User.findOneAndUpdate({ email: userEmail })
    .then((userFound) => {
      if (userFound !== null ){
        userFound.resetPasswordToken = Math.random().toString(36).substring(7);
        userFound.resetPasswordExpires = new Date().getDate + 1;
        res.status(httpStatus.ACCEPTED).json( userFound );
      }
    })
}

module.exports = { load, get, create, update, remove, lostPassword };
