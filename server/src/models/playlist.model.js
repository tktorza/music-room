import mongoose from 'mongoose'

const PlayListSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  users: Array,
  songs: Array,
})

const PlayList = mongoose.model('PlayList', PlayListSchema)

module.exports = PlayList
