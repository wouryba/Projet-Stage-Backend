const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const verifyToken = require('../middlewares/verifyToken'); //






router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', AuthMiddleware, AuthController.profile);
router.put('/profile', AuthMiddleware, AuthController.updateProfile);
router.post('/logout', AuthController.logout);

router.get('/profile', verifyToken, AuthController.profile);



module.exports = router;
