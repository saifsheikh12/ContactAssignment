const express = require("express");
const bodyParser = require('body-parser');
const { default: mongoose } = require("mongoose");
const route = require("./route/route")
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require('axios');
const mysql=require("mysql2")


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysqldata12",
    database: "arshad"
})


app.get("/api/get", (req, res) => {
    const getData = "SELECT * FROM arsh";
    db.query(getData, (err, result) => {
        res.send(result)
        //console.log(result)

    })
})






mongoose.connect("mongodb://localhost:27017/?directConnection=true", {
    useNewUrlParser: true
}).then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});







  app.post("/api/post", (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store} = req.body;
    const sqlInsert = "INSERT INTO contact(first_name, last_name, email, mobile_number, data_store) VALUES ('suraj','kumar','suraj@gmail.com',53453345,'yes')";
    db.query(sqlInsert, [first_name, last_name, email, mobile_number, data_store], (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})

