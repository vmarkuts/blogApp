var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000;

mongoose.connect('mongodb://localhost:27017/blog_app',  { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

  // title
  // image
  // body
  // created

app.listen(port, function() {
  console.log('Blog App is Running on port '+port);
});
