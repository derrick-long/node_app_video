const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
module.exports = router;

// connect to mongoose
mongoose.connect('mongodb://localhost/video-notes',{

})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err));


// Login route
router.get('/login', (req,res)=> {
  res.render('users/login');
});

router.get('/register', (req,res)=> {
  res.send('register');
});
//
