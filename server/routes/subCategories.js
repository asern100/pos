const express = require('express')
const router = express.Router()
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

router.post("/", async (req, res) => {
    try {     
        const newSubCategory = new SubCategory(req.body);
        const parentCategory = await Category.findById(req.body.categoryID)
        if (parentCategory) {
            const subCategory = await newSubCategory.save();
            res.send(subCategory)
        } else {
            res.send('No Category selected')
        }
      } catch (err) {
        console.error(err.message);
      }
 })
router.get("/", async (req, res) => {
    
    await SubCategory.find().then( data => res.json(data) ).catch( err => res.json(err) )
    
})
 module.exports = router