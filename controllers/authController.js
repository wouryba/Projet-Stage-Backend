const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
  // 📝 Inscription
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

      // ✅ Création du token avec l'ID du nouvel utilisateur
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      res.status(201).json({
        message: 'Inscription réussie.',
        token,
        user: {
          name,
          email,
          password,
         
          // ❌ Ne retourne jamais le mot de passe, même hashé
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
  },

  // 🔑 Connexion
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
          password,

          // ❌ Ne retourne pas le mot de passe
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
  },
  // 👤 Profil utilisateur
  profile: async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password, // ⚠️ optionnel selon environnement
         
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
  }, 
   // ✏️ Modifier le profil (juste après profile)
  updateProfile: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      res.status(200).json({
        message: 'Profil mis à jour avec succès.',
        user: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
  },

  // 🚪 Déconnexion
  logout: (req, res) => {
    res.status(200).json({
      message: 'Déconnexion réussie. Veuillez supprimer le token côté client.'
    });
  }
};


module.exports = AuthController;
