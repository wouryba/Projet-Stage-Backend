// Contrôleur pour l'upload d'image de profil
exports.uploadProfileImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucune image envoyée.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  // Tu peux ici enregistrer l'URL dans la base de données si nécessaire

  res.status(200).json({
    message: 'Image de profil téléchargée avec succès',
    imageUrl,
  });
};

// Contrôleur pour l'upload d'image d'article
exports.uploadArticleImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucune image envoyée.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  // Tu peux ici enregistrer l'image de l'article dans une base de données

  res.status(200).json({
    message: 'Image d’article téléchargée avec succès',
    imageUrl,
  });
};
