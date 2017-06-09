const output = require('d3node-output')
const ejs = require('ejs')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static('public/css/'))

const votingData = require('../models/votingSchema')

const VotingRoute = require('../routes/voting')

//mongoose DATABASE
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// mongoose.connect('mongodb://localhost/d3_vote')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/d3_vote'

mongoose.connect(MONGODB_URI)
.then(()=>console.log('connected to MONGODB server'))
.catch(err=>console.log('Server disconnected'))


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

app.use(VotingRoute)

app.listen(PORT, ()=> console.log('server on port: '))
console.log(process.env.MONGODB_URI);
console.log(process.env.NODE_ENV);
