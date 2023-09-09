const express = require('express');
const authController = require('../controllers/UserController');
const checkUserRole = require('../middlewares/checkRole');

const router = express.Router();

// Route d'enregistrement
router.post('/auth/register', authController.register);

// Route de connexion
router.post('/auth/login', authController.login);

// Route de vérification du rôle
    router.get('/checkUserRole', checkUserRole);

module.exports = router;
