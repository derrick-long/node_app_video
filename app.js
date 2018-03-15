const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
// load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');


//passport configuration
require('./config/passport')(passport);

mongoose.connect('mongodb://localhost/video-notes',{

})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err));

//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//methodoveeride middleware
app.use(methodOverride('_method'));

// express-session middleware
app.use(session({
  secret: 'dog barks' ,
  resave: true,
  saveUninitialized: true
}));

app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
//global vars
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



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



//use routes

app.use('/ideas', ideas);

app.use('/users', users);

const port = 5000;

app.listen(port,()=>{
 console.log(`Server started on port ${port}`);
});
