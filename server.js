const output = require('d3node-output')
const ejs = require('ejs')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const d3 = require('d3')

const votingData = require('./models/votingSchema')

const VotingRoute = require('./routes/voting')

//mongoose DATABASE
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// mongoose.connect('mongodb://localhost/d3_vote')
const MONGODB_URI = 'mongodb://admin:admin@ds119302.mlab.com:19302/voting'

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('connected to MONGODB server'))
.catch(err=>console.log('Server disconnected'))

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.use(VotingRoute)

app.listen(3000, ()=> console.log('server on port: '))
console.log(process.env.MONGODB_URI);
