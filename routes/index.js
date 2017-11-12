// CREATE ROUTER
const express = require('express');
const router = express.Router();

// RENDER HOMEPAGE
app.get('/', function(req, res, next){
  res.render('index');
});

module.exports = router;
