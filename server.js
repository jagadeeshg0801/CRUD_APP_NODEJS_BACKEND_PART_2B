const express = require("express");
const dotEnv = require("dotenv");
const app = express();
const { MongoClient } = require("mongodb");

const employeeRoutes = require("./routes/employeeRoute");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotEnv.config();
const port = process.env.PORT || 5555;




// For DB Connect type1 with MongoClient
// MongoClient.connect(process.env.MONGO_URI).then(()=>{
//     console.log("Mongo DB Connected $ucce$$fullY... :) !")
// })

// PROJECT NAME: JAGADEESH'S ORG - 2024-01-24 > DBCONNECTEXAMPLE > DATABASES

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Mongoose Connection successfully established..!')
}).catch((error) => {
    console.log('ABCD', error)
});
app.use(bodyParser.json())
app.use('/emp', employeeRoutes) // router connections middleware


app.listen(port, () => {
    console.log('server started successfully!!', port)
})