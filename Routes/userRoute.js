const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const UserController = require('../controllers/UserController');

// Route protégée pour obtenir les infos du user connecté
router.get('/me', authMiddleware, UserController.getProfile);

module.exports = router;
