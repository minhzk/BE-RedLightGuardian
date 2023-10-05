import { dbDatabase, dbUser, dbPassword } from '../config/index.js';
import express from 'express';
import Sequelize from 'sequelize';
const app = express();

const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL connected successful.');
  })
  .catch((err) => {
    console.error('MySQL connected fail:', err);
  });

sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
});

export default sequelize;