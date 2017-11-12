
// MODULES
const express = require('express');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes');


// APP
const app = express();


// PORT
app.set('port', process.env.PORT || 8016);


// VOLLEYBALL
app.use(volleyball);


// NUNJUCKS
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views',{noCache: true}); // point nunjucks to the proper directory for templates


// BODYPARSER
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// SYNC DB -> START SERVER
db.sync({force: true})
.then(function(){
    app.listen(app.get('port'), function() {
      console.log(`Engaged! App started on http://localhost:${app.get('port')}! press Ctrl-C to disengage`);
    });
  })
  .catch(console.error);


// ROUTE REQUESTS
app.use('/', routes);

