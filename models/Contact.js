class Contact {
  constructor(name, email, subject, message, status = 'new') {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  validate() {
    const errors = [];

    if (!this.name || this.name.trim().length < 2 || this.name.trim().length > 50) {
      errors.push('Le nom doit contenir entre 2 et 50 caractères');
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      errors.push('Email invalide');
    }

    if (!this.subject || this.subject.trim().length < 5 || this.subject.trim().length > 100) {
      errors.push('Le sujet doit contenir entre 5 et 100 caractères');
    }

    if (!this.message || this.message.trim().length < 10 || this.message.trim().length > 1000) {
      errors.push('Le message doit contenir entre 10 et 1000 caractères');
    }

    if (!['new', 'read', 'replied'].includes(this.status)) {
      errors.push('Statut invalide');
    }

    return errors;
  }
}

module.exports = Contact;