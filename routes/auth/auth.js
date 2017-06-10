const express = require('express');
const route = express.Router()
const passport = require('passport');
const User = require('../../models/user')
const app = express()


let isLoggedin = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next()
  }
}



route.get('/register', (req, res)=>{
  res.render('auth')
})

route.post('/register', (req, res)=>{
  let userInfo = {username: req.body.username}
  User.register(new User(userInfo), req.body.password, (err, user)=>{
    if(err){console.log('error logging user registration');

return res.render('auth')
  }
app.locals.username = user.username
console.log(app.locals.username);
        passport.authenticate('local')(req, res, ()=>{
          res.render('voting', {
            username: user.username
          })
        })
  })
})

route.get('/login', (req, res)=>{
  res.render('login')
})

route.post('/login', passport.authenticate('local', {
  successRedirect: '/voting/new',
  failureRedirect: '/login'
}), (req, res)=>{
  console.log(res);
})

route.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})

module.exports = route
