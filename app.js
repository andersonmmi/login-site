const express = require('express');
const mustache = require('mustache-express');
const loginRouter = require('./routes/login');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const User = require('./users/users');
const app = express();
const port = 3000;
const session = require('express-session');

app.engine('mustache',mustache());
app.set('view engine', 'mustache');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//this is the good stuff right here
app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUnitialized : true
}));

app.use('/', function(req, res, next){
  console.log("MIDDLEWARE EXECUTED");
  console.log("req.session = " +req.session)
  let views = req.session.views
  if (!views) {
    views = req.session.views = {}
  }
  let pathname  = parseurl(req).pathname

  views[pathname] = (views[pathname] || 0) +1
  console.log("views[pathname] = " +views[pathname]);
  next();
});

function authenticate(req, username, password){
  let authenticatedUser = User.users.find(function(user){
  if (username === user.username && password === user.password){
      req.session.authenticated = true;
      console.log('User & Password Authenticated');
    } else {
      return false
  }});
  console.log(req.session);
  return req.session;
}

// var sess = {
//   secret: 'keyboard cat',
//   cookie: {}
// }
//
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

//app.use(session(sess))
// app.use(session({
//   genid: function(req) {
//     console.log(genuuid);
//     return genuuid() // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat'
// }))



app.get('/',function(req, res){
  res.render('index');
  // next();
});

app.get('/login', function(req,res) {
  res.render('login');
});

app.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  authenticate(req, username, password);
  if (req.session && req.session.authenticated){
    res.render('welcome', { username: username });
  } else {
    res.redirect('/');
  }
})

app.post('/check', function(req, res){
  console.log("button clicked");
  // todones.push(req.body.todoCheck);
  //res.redirect('/');
});

app.listen(port, function(){
  console.log('listening on ' + port);
});
