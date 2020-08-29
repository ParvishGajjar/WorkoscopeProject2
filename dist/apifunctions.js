"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCity = getCity;
exports.getState = getState;
exports.getCountry = getCountry;
exports.insertLocation = insertLocation;

// eslint-disable-next-line no-undef
// var connection=global.connection;
// console.log(connection)
function getCity(req, res) {
  var sid = req.params.id;
  connection.query(`select * from city where STATE_ID=${sid};`, (err, rows) => {
    if (err) {
      console.log(err);
    }

    console.log(rows);
    res.end(JSON.stringify(rows));
  });
}

function getState(req, res) {
  var cid = req.params.id;
  connection.query(`select * from state where COUNTRY_ID=${cid};`, (err, rows) => {
    if (err) {
      console.log(err);
    }

    console.log(rows);
    res.end(JSON.stringify(rows));
  });
}

function getCountry(req, res) {
  connection.query(`select * from country;`, (err, rows) => {
    if (err) {
      console.log(err);
    }

    console.log(rows);
    res.end(JSON.stringify(rows));
  });
}

function insertLocation(req, res) {
  connection.query(`insert into emploc (EMP_ID,COUNTRY_ID,STATE_ID,CITY_ID) values (${req.body.empid},${req.body.countryid},${req.body.stateid},${req.body.cityid});`, (err, results) => {
    if (err) {
      console.log(err);
    }

    console.log(results);
    res.send(results);
  });
}