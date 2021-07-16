const express = require('express')
const router = express.Router()
const Order = require('../models/Order');



router.post("/", async (req, res) => {
    
    
    const amount = req.body.amount
    const number = req.body.number
    delete req.body.amount
    delete req.body.number
    try {     
        const newOrder = new Order({
          number:  number,
          amount : amount,
          content : req.body,
          date: new Date().toISOString()
        });
        const order = await newOrder.save();
        res.send(order)    
      } catch (err) {
        console.error(err.message);
      }
 })

router.get("/", async (req, res) => {
    
    await Order.find().then( data => res.json(data) ).catch( err => res.json(err) )
    
})


 module.exports = router