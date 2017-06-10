const express = require('express');
const route = express.Router({mergeParams: true})
const votingData = require('../models/votingSchema')

route.get('/voting/new', (req, res)=>{
  res.render('voting')
})

route.post('/voting/new', (req, res)=>{
votingData.create({
  title: [req.body.title],
  one: [req.body.name1],
  two: [req.body.name2]
}, (err, votingApp)=>{
  if(err){console.log('Error create voting data')}
  else {
    votingData.find({}, (err, votingApp)=>{
      if(err){console.log('error posting data');}
      else {
            res.redirect('/voting')
      }
    })
  }
})

})


module.exports = route
