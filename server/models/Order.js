const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
    number : Number,
    amount : Number,
    content : Array,
    date: String,
});

module.exports = model('Order', orderSchema);



  