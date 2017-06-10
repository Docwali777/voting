import output from 'd3node-output'
import ejs from 'ejs'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
const passport = require('passport');
let LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session');
//PORT
const PORT = process.env.PORT || 3000

//MONGODB Modesl
import votingData from '../models/votingSchema'
 import User from '../models/user'

//Routes
import VotingRoute from '../routes/voting'
import CreateNewVote from '../routes/createnewvote'
import RemoveVoteApp from '../routes/removevoting'
import AuthUser from '../routes/auth/auth'

//mongoose DATABASE
import mongoose from 'mongoose'
mongoose.Promise = global.Promise

let MONGODB_URI;

if(process.env.NODE_ENV !== 'production'){
  MONGODB_URI = 'mongodb://localhost/d3_vote'
} else {
  MONGODB_URI = process.env.MONGODB_URI
}


const app = express()

app.use(express.static('public/css/'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))



//Authentification
app.use(expressSession({
  secret: 'my baby',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next)=>{
res.locals.user = req.user
  next()
})

//ROUTES
app.use(CreateNewVote)
app.use(VotingRoute)
app.use(RemoveVoteApp)
app.use(AuthUser)



mongoose.connect(MONGODB_URI)
.then(()=>console.log('connected to MONGODB server'))
.catch(err=>console.log('Server disconnected'))


app.listen(PORT, ()=> console.log(`server on port: ${PORT} `))
