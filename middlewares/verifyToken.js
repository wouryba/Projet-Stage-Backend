const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie que le header Authorization est présent et commence par "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant ou mal formé.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Vérifie le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Injecte les infos utilisateur dans la requête
    req.userId = decoded.userId; // ou decoded.id selon ce que tu as mis dans le token
    next(); // passe au contrôleur suivant
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré.', error: err.message });
  }
};

module.exports = verifyToken;
