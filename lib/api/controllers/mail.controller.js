'use strict';
const config = require( '../../utils/config' );
const mailgun = require( '../../utils/mailgun' );
const pug = require('pug');
const EMAIL_TEMPLATES_ROOT = '../../../email-templates/';

/**
 * Send mail for account confirmation
 */
function accountConfirmation(userObject) {

  var data = {
    from: config.fromEmail,
    to: 'jensderond@gmail.com',
    subject: 'Account bevestiging',
    text: 'Hoi '+ userObject.firstName + ', \n\nJe account is aangemaakt!\n\nToedeloe!'
    // text: pug.renderFile( EMAIL_TEMPLATES_ROOT + 'account-confirm.pug' )
  };

  mailgun.messages().send(data, function (error, body) {
    if ( error ) {
      console.error(error);
      return false;
    }
    else {
      console.log('mail has been send');
      console.log(body);
      return true;
    }
  });
}

module.exports = { accountConfirmation };
