'use strict';
const User = require( '../../models' ).User;

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.findById(id)
    .then((user) => {
      req.foundUser = user;
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.foundUser);
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
  const user = new User({
    email:      req.body.email,
    firstName:  req.body.firstName,
    lastName:   req.body.lastName,
    address:    req.body.address,
    city:       req.body.city,
    province:   req.body.province,
    postalCode: req.body.postalCode,
    country:    req.body.country,
    admin:      false
  });
  user.setPassword(req.body.password);

  user.save()
    .then(savedUser => res.json(savedUser))
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
  const user       = req.user;
  user.email       = req.body.email;
  user.firstName   = req.body.firstName;
  user.lastName    = req.body.lastName;
  user.address     = req.body.address;
  user.city        = req.body.city;
  user.province    = req.body.province;
  user.postalCode  = req.body.postalCode;
  user.country     = req.body.country;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, remove };
