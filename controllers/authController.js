const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  // Inscription
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();


      // badianen

      res.status(201).json({
        message: 'Inscription réussie.',
        user: {
          name,
          email,
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
  },

  // Connexion
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email ou mot de passe invalide.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email ou mot de passe invalide.' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      res.status(200).json({
        message: 'Connexion réussie.',
        token,
        user: {
          email,
          password
         
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
  },

  // 🔐 Profil utilisateur
  profile: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password'); // Exclure le mot de passe
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
  },

  // 🚪 Déconnexion (côté backend, on informe seulement)
  logout: (req, res) => {
    // Si tu utilises un token stateless, la déconnexion se fait côté client (en supprimant le token)
    res.status(200).json({ message: 'Déconnexion réussie. Veuillez supprimer le token côté client.' });
  }
};

module.exports = authController;
