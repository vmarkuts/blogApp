var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    faker = require('faker'),
    port = 3000;


//app config
mongoose.connect('mongodb://localhost:27017/blog_app',  { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//mongoose config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: faker.lorem.words(),
//   image: faker.random.image(),
//   body: faker.lorem.paragraphs()
// }, function(err,newlyCreated){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('new blog \"'+newlyCreated.title+'\" created');
//   }
// })


//RESTful routes

app.get('/', function(req,res){
  res.redirect('/blogs');
});

app.get('/blogs', function(req,res){
  //find everything and then callback
  Blog.find({}, function(err,blogs){
    if (err) {
      console.log('Error! ' + err);
    } else {
      res.render('index', {blogs:blogs});
    }
  });
});



app.listen(port, function() {
  console.log('Blog App is Running on port '+port);
});
