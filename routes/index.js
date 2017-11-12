
// CREATE ROUTER
const express = require('express');
const router = express.Router();


module.exports = function (io) {

// RENDER HOMEPAGE
  router.get('/', function(req, res, next){
    res.render('index');
  });

  // io.sockets.emit('newTweet', {name: result.rows[0].name, tweet: req.body.text});
  // res.redirect('/')

  return router;
};
