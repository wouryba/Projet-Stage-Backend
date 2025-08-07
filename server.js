// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const articleRoute = require('./Routes/articleRoute'); 
const uploadRoutes = require('./Routes/uploadRoutes'); 
const categorieRoutes = require('./Routes/categorieRoute');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoute);
app.use('/api/upload', uploadRoutes); // <-- AJOUT ICI
app.use('/api/categories', categorieRoutes);

// Pour servir les images statiques
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon backend !');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
