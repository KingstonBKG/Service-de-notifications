const emailService = require('../../utils/emailServices');
const Contact = require('../../models/Contact');

const sendone = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Vérifiez que les propriétés existent avant d'appeler trim()
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'Tous les champs sont requis'
        });
    }

    // Créez une instance de Contact pour la validation
    const contact = new Contact(name.trim(), email.toLowerCase().trim(), subject.trim(), message.trim(), 'new');

    // Validez le contact
    const errors = contact.validate();
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation échouée',
            errors: errors
        });
    }

    try {
        // Envoyez l'email après validation
        await Promise.all([
            emailService.sendConfirmationEmail({ to: email, name }),
        ]);

        res.status(201).json({
            success: true,
            message: 'Message envoyé avec succès',
            data: contact
        });
    } catch (e) {
        console.log(e);
        res.status(504).json({
            success: false,
            message: 'Message non envoyé'
        });
    }
}

module.exports = {
    sendone
}