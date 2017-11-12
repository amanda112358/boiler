
// SET UP DB CONNECTION
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/DBNAMEHERE', {
    logging: false
});


// TEST DB CONNECTION
db
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
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


// EXPORT DB
module.exports = db;
