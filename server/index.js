const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require("dotenv")
const mongoose = require("mongoose")


//routes
const mealsRoutes = require("./routes/meals")
const categoriesRoutes = require("./routes/categories")
const subCategoriesRoutes = require("./routes/subCategories")
const ordersRoutes = require("./routes/orders")
//middleware
app.use(helmet())
app.use(morgan("common"))
app.use(cors());
app.use(express.json()); //req.body

app.use('/meals/',mealsRoutes)
app.use('/categories/',categoriesRoutes)
app.use('/subCategories/',subCategoriesRoutes)
app.use('/orders/',ordersRoutes)


dotenv.config();


mongoose.connect('mongodb://localhost:27017/pos', { useUnifiedTopology: true, useNewUrlParser:true })
.then(() => {
    console.log("connected to atlas SUCCESS !");
    return app.listen(3000, () => console.log("Server Up & Running "));
})

