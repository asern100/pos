const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require("dotenv")
const mongoose = require("mongoose")


//routes
const mealsRoutes = require("./routes/meals")

//middleware
app.use(helmet())
app.use(morgan("common"))
app.use(cors());
app.use(express.json()); //req.body

app.use('/meals/',mealsRoutes)


dotenv.config();


mongoose.connect('mongodb://localhost:27017/pos', { useUnifiedTopology: true, useNewUrlParser:true })
.then(() => {
    console.log("connected to atlas SUCCESS !");
    return app.listen(3000, () => console.log("Server Up & Running "));
})

