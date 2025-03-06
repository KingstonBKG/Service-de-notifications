const emailService = require('../../utils/emailServices');

const sendone = async (req, res) => {

    const { name, email, subject, message } = req.body;

    try{
        const contact = await Contact.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            subject: subject.trim(),
            message: message.trim(),
            status: 'new',
            metadata: {
                userAgent: req.headers['user-agent'],
                ipAddress: req.ip,
                timestamp: new Date()
            }
        });
    
        await Promise.all([
            emailService.sendConfirmationEmail({ to: email, name }),
        ]);
    
    
        res.status(201).json({
            success: true,
            message: 'Message envoyé avec succès',
            data: contact
        });
    }catch(e){
        console.log(e)
        res.status(504).json({
            success: false,
            message: 'Message non envoyé'
        });
    }
}

module.exports = {
    sendone
}