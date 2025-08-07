const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const {
  uploadProfileImage,
  uploadArticleImage,
} = require('../controllers/uploadController');

// ✅ Route GET pour image de profil
router.get('/profile', (req, res) => {
  res.send('🔁 Cette route est prévue pour un POST afin d\'envoyer une image de profil.');
});

// ✅ Route POST pour image de profil (le champ du fichier doit s'appeler "profileImage")
router.post(
  '/profile',
  upload.single('profileImage'), // ⛔ Si tu envoies "file" ou un autre nom, ça plantera
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier reçu. Utilise le champ "profileImage".' });
    }
    next();
  },
  uploadProfileImage
);

// ✅ Route GET pour image d'article
router.get('/article', (req, res) => {
  res.send('🔁 Cette route est prévue pour un POST afin d\'envoyer une image d\'article.');
});

// ✅ Route POST pour image d'article (le champ du fichier doit s'appeler "articleImage")
router.post(
  '/article',
  upload.single('articleImage'),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier reçu. Utilise le champ "articleImage".' });
    }
    next();
  },
  uploadArticleImage
);

module.exports = router;
