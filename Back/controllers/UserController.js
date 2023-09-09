const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Créez un nouvel utilisateur
        const user = await User.create({ username, password });
        res.status(201).send({ userId: user.id, username: user.username, role: user.role });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Trouvez l'utilisateur par son nom d'utilisateur
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        // Vérifiez le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Générez un JWT
        const token = jwt.sign({ userId: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        const isAdmin = user.role === 'admin'; // Ici, je suppose que le rôle administrateur est représenté par la chaîne 'admin'.

        res.send({ token, isAdmin });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
