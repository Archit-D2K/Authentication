const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const authrouter =require("./routes/authRouter.js")
const app = express()
const ProductRouter = require("./routes/ProductRouter.js")
require("dotenv").config
require("./models/db")
const PORT = process.env.PORT || 8080;

app.get("/hot", (req,res)=>{
    res.send("hey baby")  

})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/auth",authrouter)
app.use("/products",ProductRouter)


app.listen(PORT , () =>{
    console.log("app is running at port :",PORT);
})