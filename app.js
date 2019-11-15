const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// SET THE TEMPLATE ENGINE
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// SET THE STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(__dirname + '/public'));

// CUSTOM MIDDLEWARE
app.use(function(req, res, next) {
  console.log('CUSTOM MIDDLEWARE');

  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// REGISTER THE PARTIAL
hbs.registerPartials(__dirname + '/views/partials');

// ROUTES

// Example of app.get('users/:username')
/* 
app.use(function(req, res, next) {
   if (req.method === 'GET' && req.path === '/users/:username') {
    console.log(req);

    res.send(req.params);
   } 
   else {
     next();
   }
})
 */

app.get('/users/:username', (req, res, next) => {
  console.log(req);

  res.send(req.params);
});

app.get('/users/:username/books/:bookId', (req, res, next) => {
  console.log(req);

  res.send(req.params);
});

app.get('/books/:bookId', (req, res, next) => {
  console.log(req.params);

  res.send(req.params);
});

app.get('/search', (req, res, next) => {
  console.log('req.path ->', req.path);
  console.log('req.query ->', req.query);
  console.log('req.params ->', req.params);
  console.log('req.method ->', req.method);
  console.log('req.headers ->', req.headers);

  console.log(req.query);

  res.send(req.query);
});

app.post('/email', (req, res, next) => {
  console.log(req.body);

  res.send();
});

app.use('/', (req, res, next) => {
  res.render('index');
});

// START THE SERVER
app.listen(PORT, () => console.log(`Server listening on port ${PORT} !`));
