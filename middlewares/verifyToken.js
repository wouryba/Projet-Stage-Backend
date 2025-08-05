// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie la présence du header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  // Récupère le token sans le "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Injecte l'ID de l'utilisateur dans la requête
    req.userId = decoded.userId;

    next(); // passe au contrôleur
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide.', error: err.message });
  }
};

module.exports = verifyToken;
