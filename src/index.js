import express from "express";
// import * as api from './apifunctions.js'
import mysql from "mysql";
const util=require('util');
var app = express();
app.use(express.json());

const locationapis = require("./Users/UserLocation/locationroutes.js");
const similarplatformapis = require("./Users/UserPlatform/platformroutes.js");
const professionapis = require("./Users/UserProfession/professionroutes.js");
const wageskillsapis = require("./Users/UserWageSkill/wageskillroutes.js");

var connection = mysql.createConnection({
  host: "52.15.61.22",
  user: "test",
  password: "test",
  database: "workoscope",
  multipleStatements: true
});

global.connection = connection;

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

export const query = util.promisify(connection.query).bind(connection);

app.use("/api/location", locationapis);
app.use("/api/similarplatform", similarplatformapis);
app.use("/api/profession", professionapis);
app.use("/api/pagefour",wageskillsapis);

app.listen(3400, (err) => {
  if (err) {
    return console.log("Error: " + err);
  }
  console.log(`Server is listening on port 3400`);
});
