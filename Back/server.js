const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const authRoutes = require('./routes/UserRoutes');
const adRoutes = require('./routes/AdRoutes');
const cors = require('cors');
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cors());


app.use('/api', authRoutes);
app.use('/api', adRoutes);

// Synchronisation avec la base de données
sequelize.sync({ alter: true }) // Utilisez { force: true } pour recréer les tables, mais cela supprimera toutes les données existantes.
    .then(() => {
        console.log('Database synchronized');

        // Démarrage du serveur seulement après la synchronisation avec la base de données
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
