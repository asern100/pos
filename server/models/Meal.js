const { model, Schema } = require('mongoose');

const mealSchema = new Schema({
  categoryID: String,
  subCategoryID: String,
  image:String,
  name: String,
  price:Number,
});

module.exports = model('meal', mealSchema);



  