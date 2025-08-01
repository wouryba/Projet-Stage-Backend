const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token décodé :", decoded);
    req.userId = decoded.userId; // ⚠️ Très important
    next();
  } catch (err) {
    console.error("Erreur token:", err.message);
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = authMiddleware;
