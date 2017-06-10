import output from 'd3node-output'
import ejs from 'ejs'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

//PORT
const PORT = process.env.PORT || 3000

//MONGODB Modesl
import votingData from '../models/votingSchema'

//Routes
import VotingRoute from '../routes/voting'
import CreateNewVote from '../routes/createnewvote'
import RemoveVoteApp from '../routes/removevoting'

//mongoose DATABASE
import mongoose from 'mongoose'
mongoose.Promise = global.Promise

let MONGODB_URI;

if(process.env.NODE_ENV == 'development'){
  MONGODB_URI = 'mongodb://localhost/d3_vote'
} else {
  MONGODB_URI = process.env.MONGODB_URI
}

mongoose.connect(MONGODB_URI)
.then(()=>console.log('connected to MONGODB server'))
.catch(err=>console.log('Server disconnected'))

const app = express()

app.use(express.static('public/css/'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

app.use(CreateNewVote)
app.use(VotingRoute)
app.use(RemoveVoteApp)


app.listen(PORT, ()=> console.log(`server on port: ${PORT} `))
console.log(MONGODB_URI);
console.log(process.env.NODE_ENV);
