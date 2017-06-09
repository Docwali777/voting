import mongoose from 'mongoose'
let {Schema} = mongoose


let votingDataSchema = new Schema({
  title: String,
  one: [String],
  two: [String]
})
module.exports = mongoose.model('VotingData', votingDataSchema)
