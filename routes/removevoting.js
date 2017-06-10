const express = require('express');
const route = express.Router()
const votingData = require('../models/votingSchema');

route.get('/voting/:id/remove', (req, res)=>{
votingData.findByIdAndRemove(req.params.id, (err, votingApp)=>{
  if(err){console.log('error removing document from data')}
  else {
    res.redirect('/voting')
  }
})
})
module.exports = route
