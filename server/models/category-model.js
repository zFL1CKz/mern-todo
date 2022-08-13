const {Schema, model, Types} = require('mongoose')

const CategorySchema = new Schema({
  name: {type: String, required: true},
  icon: {type: String, default: 'default.svg'},
  color: {type: String, default: '#8687E7'},
  user: {type: Types.ObjectId, ref: 'User', default: null}
})

module.exports = model('Category', CategorySchema)