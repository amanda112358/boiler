const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/DBNAMEHERE', {
    logging: false
});


// DEFINE MODELS

const Model = db.define('table', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false
  }
});

module.exports = db;
