"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCity = getCity;
exports.getState = getState;
exports.getCountry = getCountry;
exports.insertLocation = insertLocation;

var _index = require("../../index.js");

var _apivalidations = require("../../Validation/apivalidations.js");

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Functiion to fetch all cities.
async function getCity(req, res) {
  try {
    var sid = parseInt(req.params.sid);

    if ((0, _apivalidations.notEmpty)(sid)) {
      const city = await (0, _index.query)(`select * from cities where state_id=${sid};`);

      if ((0, _apivalidations.notEmpty)(city)) {
        console.log(city);
        res.end(JSON.stringify(city));
      } else {
        throw "Error fetching city";
      }
    } else {
      throw "Error Detected, State Value is not integer";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
} // Function to fetch all states.


async function getState(req, res) {
  try {
    var cid = parseInt(req.params.cid);

    if (Number.isInteger(cid)) {
      const state = await (0, _index.query)(`select * from states where country_id=${cid};`);

      if ((0, _apivalidations.notEmpty)(state)) {
        console.log(state);
        res.status(200).json(`State fetched: ${JSON.stringify(state)}`);
      } else {
        throw "Error Detected: Couldn't fetch states.";
      }
    } else {
      throw "Error Detected";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
} // Function to fetch all countries.


async function getCountry(req, res) {
  try {
    const country = await (0, _index.query)(`select * from countries;`);

    if ((0, _apivalidations.notEmpty)(country)) {
      console.log(country);
      res.status(200).json({
        message: `Country data fetched: ${JSON.stringify(country)}`
      });
    } else {
      throw "Error: Incorrect fetch";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
} // Function to insert user location.


async function insertLocation(req, res) {
  try {
    if ((0, _apivalidations.notEmpty)(req.body.empid) && (0, _apivalidations.notEmpty)(req.body.countryid) && (0, _apivalidations.notEmpty)(req.body.stateid) && (0, _apivalidations.notEmpty)(req.body.cityid)) {
      const insertLoc = await (0, _index.query)(`insert into emploc (EMP_ID,COUNTRY_ID,STATE_ID,CITY_ID) values (${req.body.empid},${req.body.countryid},${req.body.stateid},${req.body.cityid});`);

      if ((0, _apivalidations.notEmpty)(insertLoc)) {
        console.log(insertLoc);
        res.send(insertLoc);
      } else {
        throw "Error Detected: Couldn't Insert Data";
      }
    } else {
      throw "Body Parameter are Invalid";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}