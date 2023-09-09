// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('DealGrown', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;
