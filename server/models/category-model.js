const {Schema, model, Types} = require('mongoose')

const CategorySchema = new Schema({
  name: {type: String, required: true},
  icon: {type: Types.ObjectId, ref: 'CategoryIcon'},
  color: {type: String, default: '#8687E7'},
  user: {type: Types.ObjectId, ref: 'User', required: false, default: null}
})

module.exports = model('Category', CategorySchema)