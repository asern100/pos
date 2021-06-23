const { model, Schema } = require('mongoose');

const subCategorySchema = new Schema({
  categoryID:String,
  image:String,
  name: String,

});

module.exports = model('SubCategory', subCategorySchema)