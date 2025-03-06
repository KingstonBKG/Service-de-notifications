const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const app = express();
const emailRoute = require('./api/routes/emailRoute');

const allowedOrigins = [
  'http://localhost:3000',];

const corsOptions = {
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true, 
};

app.use(cors(corsOptions));


app.use(express.json());



app.use('/api/sendmail', emailRoute);



// Gestion des routes non trouvées pour l'API
app.get('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});


// Démarrage du serveur
app.listen(3000, () => {
  console.log(`Serveur démarré sur le port http://localhost:${config.port}`);
});
