const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
  image:String,
  name: String,

});

module.exports = model('category', categorySchema)