const express = require('express');
const mustache = require('mustache-express');
const loginRouter = require('./routes/login');
const User = require('./users/users');
const app = express();
const port = 3000;
const session = require('express-session');

app.engine('mustache',mustache());
app.set('view engine', 'mustache');
app.set('views','./views');

app.use('/', function(req, res, next){
  console.log("MIDDLEWARE EXECUTED");
  // let views = req.session.views
  // if (!views) {
  //   views = req.session.views = {}
  // }
  // let pathname  = parseurl(req).pathname
  //
  // views[pathname] = (views[pathname] || 0) +1
  next();
});

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

// app.post('/login', function(req, res, ){
//   console.log(input.value);
//
// });

app.post('/check', function(req, res){
  console.log("button clicked");
  // todones.push(req.body.todoCheck);
  //res.redirect('/');
});

app.listen(port, function(){
  console.log('listening on ' + port);
});
