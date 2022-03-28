const express = require('express')
const router = express.Router()
const Meal = require('../models/Meal');
const SubCategory = require('../models/SubCategory');


router.post("/", async (req, res) => {
    try {     
        const newMeal = new Meal(req.body);
        
        const subCategory = await SubCategory.findById(req.body.subCategoryID)
        if (subCategory){
          const meal = await newMeal.save();
          res.send(meal)
        } else{
          res.send('Select Sub Category !')
        }
      } catch (err) {
        console.error(err.message);
      }
 })

router.get("/", async (req, res) => {
    
    await Meal.find().then( data => res.json(data) ).catch( err => res.json(err) )
    
})

router.get("/:categoryID", async (req, res) => {
    
  await Meal.find({"categoryID" : req.params.categoryID}).then( data => res.json(data) ).catch( err => res.json(err) )
  
})

router.get("/:subCategoryID", async (req, res) => {
    
  await Meal.find({"subCategoryID" : req.params.subCategoryID}).then( data => res.json(data) ).catch( err => res.json(err) )
  
})

router.put("/:id", async (req, res) => {
  try {     
      const meal = Meal.findByIdAndUpdate(req.params.id, {...req.body} ).then( data => res.json(data) ).catch( err => res.json(err) ) 
    } catch (err) {
      console.error(err.message);
    }
})
router.delete("/:id", async (req, res) => {
  try {     
      const meal = Meal.findByIdAndDelete(req.params.id ).then( data => res.json(data) ).catch( err => res.json(err) ) 
    } catch (err) {
      console.error(err.message);
    }
})
 module.exports = router