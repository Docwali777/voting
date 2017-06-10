const express = require('express');
const route = express.Router()
const passport = require('passport');
const User = require('../../models/user')

route.get('/register', (req, res)=>{
  res.render('auth')
})

route.post('/register', (req, res)=>{
  let userInfo = {username: req.body.username}
  User.register(new User(userInfo), req.body.password, (err, user)=>{
    if(err){console.log('error logging user registration');
return res.render('auth', {
user
})
  }
        passport.authenticate('local')(req, res, ()=>{
          res.redirect('/')
        })
  })
})

module.exports = route
