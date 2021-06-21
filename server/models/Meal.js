const { model, Schema } = require('mongoose');

const mealSchema = new Schema({
  
  name: String,
  discription:String,
  price:Number,
  types:[
      {title:String , price:Number}
  ]
});

module.exports = model('meal', mealSchema);