//register
//login
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
console.log('register:', register, 'login:', login);



router.post('/register',  AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout); // facultatif

module.exports = router;
