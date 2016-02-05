var express = require('express');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/*
You mentioned that you weren't sure about these lines, and they look fine to me!
All of this is "middleware" -- a stack of actions every request flows through on its
way to your routing logic.

Here's what's going on:
- The logger middleware prints information about the request to your terminal window --
you've probably seen "GET 200" messages (or similar) while running your app.
- The body parser middleware parses the body portion of a request stream out and places
in req.body so it's easier for you to interface with.
- The cookie parser does something similar, but for cookies -- it hasn't been useful
yet, but we'll talk about cookies soon!
- The path.join line lets you request things in '/public' as if they're in `/`.
- The way you're doing your routing is middleware-dependent, too! The app.use('/cats', index)
line intercepts requests with paths starting with '/cats' and directs them to index to be routed.

We'll explore some more middleware soon, and you can even write your own if you want!
*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cats', index);

// Make sure you clean old code/debugging mechanisms up before submitting
// app.get('/', index.home);
// app.get('/fun', index.fun);
// app.get('/hello', index.hello);

app.listen(3000);
