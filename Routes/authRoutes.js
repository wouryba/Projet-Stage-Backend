const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authMiddleware, AuthController.profile);
router.put('/profile', authMiddleware, AuthController.updateProfile);
router.post('/logout', authMiddleware, AuthController.logout);

module.exports = router;
