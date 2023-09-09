const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Ad = sequelize.define('Ad', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    publishTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    merchantName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // 'Users' est le nom de la table. Sequelize mettra automatiquement le nom du modèle en pluriel
            key: 'id'
        }
    },
    commentsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    upvotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    downvotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
});

// Vous pouvez également définir la relation dans l'initialisation du modèle:
Ad.belongsTo(User, {foreignKey: 'authorId', as: 'author'});

module.exports = Ad;
