import d3node from 'd3-node'
import d3 from 'd3'
import output from 'd3node-output'
import ejs from 'ejs'
import express from 'express'

//mongoose DATABASE
import mongoose from 'mongoose'
let {Schema} = mongoose
mongoose.Promise = global.Promise
import bodyParser from 'body-parser'

import votingData from './models/votingSchema'

import VotingRoute from './routes/voting'


mongoose.connect('mongodb://localhost/d3_vote')
.then(()=>console.log('connected to MONGODB server'))



const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))
let votingApp = []


// app.get('/', (req, res)=>{
//   votingData.find({}, (err, votingApp)=>{
//     if(err){ console.log(err);}
//     else {
//       res.render('index', {
//         votingApp
//       })
//     }
//   })
// })



// app.get('/voting', (req, res)=>{
//   res.render('voting')
// })
// app.post('/voting', (req, res)=>{
// votingData.create({
//   title: req.body.title,
//   one: req.body.name1,
//   two: req.body.name2
// }, (err, votingApp)=>{
//   if(err){console.log('Error create voting data')}
//   else {
//     votingData.find({}, (err, votingApp)=>{
//       if(err){console.log(err);}
//       else {
//         console.log(votingApp);
//         res.redirect('/')
//       }
//     })
//   }
// })
// })


app.use(VotingRoute)

app.listen(3000, ()=> console.log('server on port: '))
