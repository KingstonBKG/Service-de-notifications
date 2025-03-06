const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Route pour récupérer les jobs en fonction du searchstring
router.get('/onesend',  emailController.sendone);

  
module.exports = router;
