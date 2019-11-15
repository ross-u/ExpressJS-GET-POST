# Express | GET,  POST, Route Params & Query String



<br>



### Create files

```bash
mkdir express-post-get
cd express-post-get

mkdir views
touch app.js views/index.hbs

npm init
npm i --save express hbs
```



File Structure

```bash
.
├── app.js
├── package.json
|
└── views/
		|
    └── index.hbs
```



`package.json` - Add `nodemon` as start script

```json
"scripts": {
	"start": "nodemon app.js",
```





## Setup `app.js`

#### Setup express and handlebars *Emmet abbr* -  `ehbs`

```js
ehbs + Tab
```

**or**

```js
const express = require('express');
const hbs = require('hbs');
const app = express();
const PORT = 3000;


// SET THE TEMPLATE ENGINE
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// SET THE STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(__dirname + '/public'));

// REGISTER THE PARTIAL 
hbs.registerPartials(__dirname + '/views/partials');


// START THE SERVER
app.listen(PORT, () => console.log(`Server listening on port ${ PORT } !`));
```

 



# Route parameters



#### 1. Create route

```js
app.get('/users/:username', (req, res, next) => {
  res.send(req.params);
})
```



#### Navigate to:	[`http://localhost:3000/users/ironhack`](http://localhost:3000/users/ironhack)





<br>



#### 2. Update route

Include additional parameters `/users/:username/books/:bookId`.

```js
app.get('/users/:username/books/:bookId', (req, res, next) => {
  res.send(req.params)
})
```



#### Navigate to:	[`http://localhost:3000/users/ironhack/book/abcd123`](http://localhost:3000/users/ironhack/book/abcd123)



<br>



#### 3. Create a new Route

```js
app.get('/books/:bookId', (req, res, next) => {
  res.send(req.params);
})
```



#### Navigate to:	[`http://localhost:3000/books/1234asdf4567`](http://localhost:3000/books/1234asdf4567)



<br>



#### Examples

Navigate to [Ironhack Labs Github Account](https://github.com/ironhack-labs) and check the URL.

GitHub server most probably resolves this  by having the route that works in the following way.

```js
app.get('/:repository', (req, res, next) => {
  res.send(req.params);
})

```





<br>



# Query String



#### 4.  Create a new Route

```js
// req.query

app.get('/search', (req, res, next) => {
  res.send(req.query)
})

```





#### Navigate to

####  [`http://localhost:3000/search?city=Barcelona&class=WebDev`](http://localhost:3000/search?city=Barcelona&class=WebDev)





<br>



### Query String from Forms



#### 5.  Add route `/ ` - Emmet abbr - `appgetrender`

```js
appgetrender + Tab

```

or

##### `app.js`

```js
app.get('/', (req, res) => {
  res
    .status(200)
    .render('index')
})

```







#### Navigate to 

####  [`http://localhost:3000/`](http://localhost:3000/)



<br>





#### Create a new route `/email`

```js
app.get('/email', (req, res, next) => {
  console.log('req.path ->', req.path);
  console.log('req.query ->', req.query);
  console.log('req.params ->', req.params);
  console.log('req.method ->', req.method);
  console.log('req.headers ->', req.headers);
  res.send(req.query);
});

```





#### Update `index.hbs`- Emmet abbr `formget`

```js
formget + Tab

```

or

##### `views/index.hbs`

```html
<form action='/email' method='GET'>

  <label for=''>Email</label>
  <input type='text' name='Email'>

  <label for=''>Password</label>
  <input type='text' name='Password'>

  <button type='submit'>Submit</button>
</form>

```







### [`MDN - <form> methods `](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data)

#### `GET` request / `method`  - 

In this case, the browser sends an empty body (`GET` has headers only). 

Because the body is empty, when a form is sent using `GET` method the data sent to the server is appended to the URL, in the form of query string.



#### `POST` request / `method`  - 

If a form is sent using `POST` method, the data is appended to the body of the HTTP request.







<br>





### Setting middleware for handling incoming `json` and form data



When working with `POST` form we need to take into consideration that data is send through the body of the `POST` request.



in order to properly parse the body of the incoming requests we need to install the `body-parser` middleware. 

Otherwise, we won't be able to use the data from the body.



```bash
npm i --save body-parser

```



### [GitHub - `body-parser` ](https://github.com/expressjs/body-parser#examples)



##### `app.js`

```js
const bodyParser = require('body-parser');

// ...
//		...

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

```





<br>



##### `app.js`

Update the `/email` route that handles the incoming form data:



```js
// UPDATE METHOD:

// .post
app.post('/email', (req, res, next) => {
  console.log('BODY', req.body);
  res.send(req.query);
});

```



<br>



##### `views/index.hbs`

```html
<!-- Update method	  				POST	-->

<form action='/email' method='POST'>

  <label for=''>Email</label>
  <input type='text' name='Email'>

  <label for=''>Password</label>
  <input type='text' name='Password'>// SET THE STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(__dirname + '/public'));

  <button type='submit'>Submit</button>
</form>

```

<br>



### [Pair Exercise - Send Form Data](https://gist.github.com/ross-u/23e07425a9eb9fe6b74a4f755d36689a) (30 min)