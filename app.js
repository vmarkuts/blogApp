var express = require('express'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    app = express(),
    faker = require('faker'),
    port = 3000;


//app config
mongoose.connect('mongodb://localhost:27017/blog_app',  { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

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

//NEW route
app.get('/blogs/new', function(req,res) {
  res.render('new');
})

//CREATE route
app.post('/blogs', function(req,res){
  //create blog
  Blog.create(req.body.blog, function(err, newBlog){
    if (err) {
      res.render('new');
    } else {
      //redirect
      res.redirect('/blogs');
    }
  });
});

//SHOW route
app.get('/blogs/:id', function(req,res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  });
});

//EDIT route
app.get('/blogs/:id/edit', function(req,res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err) {
      console.log(err);
    } else {
      res.render('edit', {blog: foundBlog})
    }
  });
});

//UPDATE route
app.put('/blogs/:id/', function(req,res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

//DELETE route
app.delete('/blogs/:id', function(req, res){
  //delete blog
  Blog.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect('/blogs');
    } else {
      //redirect somewhere
      res.redirect('/blogs')
    }
  })
});

app.listen(port, function() {
  console.log('Blog App is Running on port '+port);
});
