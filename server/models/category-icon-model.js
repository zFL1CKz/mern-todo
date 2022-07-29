const {Schema, model} = require('mongoose')

const CategoryIconSchema = new Schema({
  icon: {type: Buffer}
})

module.exports = model('CategoryIcon', CategoryIconSchema)