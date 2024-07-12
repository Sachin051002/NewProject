const Sequelize = require('sequelize');
const path = require('path');

const envPath = path.resolve(__dirname + './../../.env')
require('dotenv').config({path:envPath})

const sequelize = new Sequelize("spotNew", process.env.user, process.env.password, {
    host: process.env.host,
    dialect: "mysql",
    logging: false,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  })

const db= {};

db.user = require('../model/userModel')(Sequelize,sequelize);

module.exports = db;