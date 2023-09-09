const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vote = sequelize.define('Vote', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    adId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    voteType: {
        type: DataTypes.ENUM('up', 'down'),
        allowNull: false
    }
});

module.exports = Vote;
