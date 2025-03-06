const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport(config.emailConfig);

exports.sendConfirmationEmail = async ({ to, name }) => {
  const mailOptions = {
    from: config.emailConfig.auth.user,
    to,
    subject: 'Confirmation de réception',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="text-align: center; padding: 20px;">
          <img src="https://via.placeholder.com/200x100" alt="Logo" style="max-width: 200px; height: auto;">
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Merci de nous avoir contacté, ${name}!</h2>
          <p style="color: #666; line-height: 1.6;">Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          <p style="color: #666; margin-top: 30px;">Cordialement,</p>
          <p style="color: #666;">L'équipe DTR</p>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>© 2024 DTR. Tous droits réservés.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};