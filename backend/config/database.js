const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './db.env') });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false
});

module.exports = sequelize;
