import d3node from 'd3-node'
import d3 from 'd3'
import output from 'd3node-output'
import ejs from 'ejs'
import express from 'express'
import path from 'path'

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
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.use(VotingRoute)

app.listen(3000, ()=> console.log('server on port: '))
