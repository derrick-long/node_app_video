const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');

module.exports = router;



// connect to mongoose
mongoose.connect('mongodb://localhost/video-notes',{

})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err));


//Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea list

router.get('/', ensureAuthenticated,(req, res)=>{
  Idea.find({})
  .sort({date: 'desc'})
  .then(ideas =>{
    res.render('ideas/index', {
      ideas: ideas
    });
  });
});



// idea form
router.get('/add', ensureAuthenticated, (req, res)=>{
  res.render('ideas/add');
});
// edit idea form
router.get('/edit/:id', ensureAuthenticated, (req, res)=>{
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
      res.render('ideas/edit',{
        idea:idea
      });
  });

});

//process form to /ideas

router.post('/', ensureAuthenticated, (req,res)=>{
  let errors = [];
  if(!req.body.title){
    errors.push({text: 'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text: 'Please add some details'});
  }
  if(errors.length > 0){
    res.render('ideas/add',{
     errors: errors,
     title: req.body.title,
     details: req.body.details
   });
 } else {
   const newUser = {
     title: req.body.title,
     details: req.body.details
   };
   new Idea(newUser)
   .save()
   .then(idea => {
    req.flash('success_msg', 'Video notes added!');
     res.redirect('/ideas');
   });
 }
});

// Edit form

router.put('/:id',ensureAuthenticated, (req, res)=>{
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea=> {
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
      .then(idea=> {
        req.flash('success_msg', 'Video notes updated!');
        res.redirect('/ideas');
      });
  });
});


// Delete posted ideas

router.delete('/:id', ensureAuthenticated,(req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Video notes removed');
      res.redirect('/ideas');
    });
});
