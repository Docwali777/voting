const express = require('express');
const route = express.Router({mergeParams: true})
const votingData = require('../models/votingSchema');

let isLoggedin = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next()
  }
}

route.get('/voting/:id/remove', (req, res)=>{
votingData.findByIdAndRemove(req.params.id, (err, votingApp)=>{
  if(err){console.log('error removing document from data')}
  else {
    res.redirect('/voting')
  }
})
})
module.exports = route
