const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 *
 * @param {*} emaiId
 * @param {*} subject
 * @param {*} html
 */
function email(emaiId, subject, html) {
  const msg = {
    to: emaiId,
    from: process.env.MAIL_SENDER,
    subject,
    html
  };
  sgMail
    .send(msg)
    .then(() => {})
    .catch(error => {
      console.log(error);
    });
}

module.exports = email;
