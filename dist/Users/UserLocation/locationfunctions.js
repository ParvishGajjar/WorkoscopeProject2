"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCity = getCity;
exports.getState = getState;
exports.getCountry = getCountry;
exports.insertLocation = insertLocation;
exports.updateLocation = updateLocation;
exports.searchLocation = searchLocation;

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
        res.status(200).json({
          data: true,
          message: `${JSON.stringify(city)}`,
          status: true
        });
      } else {
        throw "Couldn't Fetch Cities";
      }
    } else {
      throw "Invalid StateID";
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      data: true,
      message: `Error: ${err}`,
      status: true
    });
  }
} // Function to fetch all states.


async function getState(req, res) {
  try {
    var cid = parseInt(req.params.cid);

    if ((0, _apivalidations.notEmpty)(cid)) {
      const state = await (0, _index.query)(`select * from states where country_id=${cid};`);

      if ((0, _apivalidations.notEmpty)(state)) {
        console.log(state);
        res.status(200).json({
          data: true,
          message: `${JSON.stringify(state)}`,
          status: true
        });
      } else {
        throw "Couldn't Fetch States.";
      }
    } else {
      throw "Invalid CountryID";
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      data: true,
      message: `Error: ${err}`,
      status: true
    });
  }
} // Function to fetch all countries.


async function getCountry(req, res) {
  try {
    const country = await (0, _index.query)(`select * from countries;`);

    if ((0, _apivalidations.notEmpty)(country)) {
      console.log(country);
      res.status(200).json({
        data: true,
        message: `${JSON.stringify(country)}`,
        status: true
      });
    } else {
      throw "Couldn't Fetch Countries";
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      data: false,
      message: `Error: ${err}`,
      status: false
    });
  }
} // Function to insert user location.


async function insertLocation(req, res) {
  try {
    if ((0, _apivalidations.notEmpty)(req.body.uid) && (0, _apivalidations.notEmpty)(req.body.countryid) && (0, _apivalidations.notEmpty)(req.body.stateid) && (0, _apivalidations.notEmpty)(req.body.cityid)) {
      const result = await (0, _index.query)(`insert into user_profile (userid,country,state,city) values (${req.body.uid},${req.body.countryid},${req.body.stateid},${req.body.cityid});`);

      if ((0, _apivalidations.notEmpty)(result)) {
        console.log(result);
        res.status(200).json({
          data: true,
          message: "Data Updated",
          status: true
        });
      } else {
        throw "Couldn't Insert Data";
      }
    } else {
      throw "Body Parameter are Invalid";
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      data: false,
      messgae: `Error: ${err}`,
      status: false
    });
  }
}

async function updateLocation(req, res) {
  try {
    if ((0, _apivalidations.notEmpty)(req.body.uid) && (0, _apivalidations.notEmpty)(req.body.countryid) && (0, _apivalidations.notEmpty)(req.body.stateid) && (0, _apivalidations.notEmpty)(req.body.cityid)) {
      var result = await (0, _index.query)(`update user_profile set country=${req.body.countryid},state=${req.body.stateid},city=${req.body.cityid} where userid=${req.body.uid}`);

      if ((0, _apivalidations.notEmpty)(result)) {
        console.log(result);
        res.status(200).json({
          data: true,
          message: "Data Updated",
          status: true
        });
      } else {
        throw "Couldn't Update Data";
      }
    } else {
      throw "Invalid Body Parameters";
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      data: false,
      messgae: `Error: ${error}`,
      status: false
    });
  }
}

async function searchLocation(req, res) {
  try {
    const uid = parseInt(req.params.uid);

    if ((0, _apivalidations.notEmpty)(uid)) {
      const result = await (0, _index.query)(`select userid,country,state,city from user_profile where userid=${uid};`);

      if ((0, _apivalidations.notEmpty)(result)) {
        console.log(result);
        res.status(200).json({
          data: true,
          message: `${result}`,
          status: true
        });
      } else {
        throw "Couldn't Search/Find Data";
      }
    } else {
      throw "Invalid UserID";
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      data: false,
      message: `Error: ${err}`,
      status: false
    });
  }
}