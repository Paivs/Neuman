const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './db.env') });

console.log("DB_NAME: " + process.env.DB_NAME);
console.log("DB_USER: " + process.env.DB_USER);
console.log("DB_PASS: " + process.env.DB_PASS);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'mysql',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
