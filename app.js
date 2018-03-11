const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');


// connect to mongoose
mongoose.connect('mongodb://localhost/video-notes',{

})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err));

//Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');


//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// index route
app.get('/', (req, res)=>{
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// about route

app.get('/about', (req, res)=>{
  res.render('about');
});

const port = 5000;

app.listen(port,()=>{
 console.log(`Server started on port ${port}`);
});
