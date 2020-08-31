import express from 'express';
import * as api from './apifunctions.js'
import mysql from 'mysql'
var app = express()
app.use(express.json());

const locationapis = require('./locationroutes.js')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "workone",
  });

global.connection=connection

connection.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
  
    console.log("Connected to the MySQL server.");
});

app.use("/api/location",locationapis)
// app.get('/api/location/getcountry',api.getCountry)
// app.get('/api/location/getstate/:id',api.getState)
// app.get('/api/location/getcity/:id', api.getCity)
// app.post('/api/location/insertlocation',api.insertLocation)


app.listen(3400, (err)=>{
    if(err){
       return console.log("Error: "+err);
    }
    console.log(`Server is listening on port 3400`);
})

