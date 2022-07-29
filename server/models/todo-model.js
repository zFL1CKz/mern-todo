const {Schema, model, Types} = require('mongoose')

const TodoSchema = new Schema({
  user: {type: Types.ObjectId || null, ref: 'User', default: null},
  name: {type: String, required: true, default: 'Untitled todo'},
  desc: {type: String},
  priority: {type: Number, required: true, default: 1},
  isCompleted: {type: Boolean, default: false},
  timestamp: {type: Number, required: true},
  category: {type: Types.ObjectId, ref: 'Category'}
})

module.exports = model('Todo', TodoSchema)