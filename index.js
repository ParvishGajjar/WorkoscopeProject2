import express from 'express';
import * as api from './apifunctions.js'
import mysql from 'mysql'
var app = express()
app.use(express.json());

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

app.get('/api/getcountry',api.getCountry)
app.get('/api/getstate/:id',api.getState)
app.get('/api/getcity/:id', api.getCity)
app.post('/api/insertlocation',api.insertLocation)


app.listen(3400, (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is listening on port 3400`);
})
