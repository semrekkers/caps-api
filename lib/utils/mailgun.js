const Mailgun = require( 'mailgun-js' );
const config = require( './config' );
const api_key = config.mailgunKey;
const domain = config.sendingDomain;

const mailgun = new Mailgun({apiKey: api_key, domain: domain});

module.exports = mollie;
