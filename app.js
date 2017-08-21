const express = require('express');
const mustache = require('mustache-express');
const app = express();
const port = 3000;

app.engine('mustache',mustache());
app.set('view engine', 'mustache');
app.set('views','./views');

app.get('/',function(req, res){
  res.render('index');
  next();
})

app.listen(port, function(){
  console.log('listening on ' + port);
})
