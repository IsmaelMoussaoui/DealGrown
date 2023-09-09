const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUserRole = async (req, res, next) => {
    try {
        // Récupérer le token du header
        const token = req.headers['authorization'].split(' ')[1];

        // Vérifier le token
        const decoded = jwt.verify(token, 'secretkey');  // Remplacez 'YOUR_SECRET_KEY' par votre clé secrète utilisée lors de la création du token

        // À ce stade, vous pouvez soit :
        // a) Utiliser le rôle inclus dans le token (si vous l'avez inclus lors de sa création) :
       // const { role } = decoded;

        // b) Ou rechercher le rôle dans votre base de données en utilisant les informations décodées :
         const user = await User.findById(decoded.id); // Exemple si vous utilisez Mongoose
         const role = user.role;

        // Envoie du rôle à l'utilisateur
        res.status(200).json({ role });

    } catch (error) {
        res.status(401).json({ message: 'Authentification échouée' });
    }
};

module.exports = checkUserRole;
