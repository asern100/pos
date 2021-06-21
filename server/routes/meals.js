const express = require('express')
const router = express.Router()
const Meal = require('../models/Meal');

router.post("/", async (req, res) => {
    try {     
        const newMeal = new Meal(req.body);
        const meal = await newMeal.save();
        res.send(meal)
      } catch (err) {
        console.error(err.message);
      }
 })

 module.exports = router