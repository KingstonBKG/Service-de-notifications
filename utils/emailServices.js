const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport(config.emailConfig);

exports.sendConfirmationEmail = async ({ to, name }) => {
  const mailOptions = {
    from: config.emailConfig.auth.user,
    to,
    subject: 'Confirmation de réception - DTR Solutions',
    html: `
      <h2>Merci de nous avoir contacté, ${name}!</h2>
      <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
      <p>Cordialement,<br>L'équipe DTR Solutions</p>
    `
  };

  await transporter.sendMail(mailOptions);
};