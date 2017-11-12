'use strict';

// IMPORT MODULES
const express = require('express');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const db = require('./models');
const router = require('./routes');
const socketio = require('socket.io');


// INSTANTIATE NEW EXPRESS APP
const app = express();


// TEMPLATING BOILERPLATE SETUP
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates, caching turned off


// LOGGING MIDDLEWARE
app.use(volleyball);


// BODY PARSING MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// SET PORT
app.set('port', process.env.PORT || 3000);


// SYNC DB -> START SERVER + ROUTING
db.sync({force: true})
.then(startServerAndRouting)
.catch(console.error);

function startServerAndRouting(){
  const server = app.listen(app.get('port'),
    console.log(`Listening on port ${app.get('port')}.`));
  const io = socketio.listen(server);
  app.use(express.static(path.join(__dirname, '/public'))); // STATIC
  app.use('/', router(io)); // MODULAR WITH SOCKETS
}
