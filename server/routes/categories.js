const express = require('express')
const router = express.Router()
const Category = require('../models/Category');

router.post("/", async (req, res) => {
    try {     
        const newCategory = new Category(req.body);
        const category = await newCategory.save();
        res.send(category)
      } catch (err) {
        console.error(err.message);
      }
 })
router.get("/", async (req, res) => {
    
    await Category.find().then( data => res.json(data) ).catch( err => res.json(err) )
    
})
 module.exports = router