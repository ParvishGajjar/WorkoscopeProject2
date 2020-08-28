import express from 'express';
import mysql from 'mysql'
var app = express()

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "workone",
  });
  
connection.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
  
    console.log("Connected to the MySQL server.");
});
  
app.get('/api/getcountry',getCountry)
app.get('/api/getstate/:id',getState)
app.get('/api/getcity/:id', getCity)

function getCity(req,res){
    var sid=req.params.id;
    connection.query(`select * from city where STATE_ID=${sid};`,(err,rows)=>{
        if(err){
            console.log(err);
        }
        console.log(rows);
        res.end(JSON.stringify(rows));
    })
}

function getState(req,res){
    var cid=req.params.id;
    connection.query(`select * from state where COUNTRY_ID=${cid};`,(err,rows)=>{
        if(err){
            console.log(err)
        }
        console.log(rows);
        res.end(JSON.stringify(rows))
    })
}
function getCountry(req,res){
    connection.query(`select * from country;`,(err,rows)=>{
        if(err){
            console.log(err);
        }
        console.log(rows)
        res.end(JSON.stringify(rows));
    })
}
app.listen(3400, (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is listening on port 3400`);
})
