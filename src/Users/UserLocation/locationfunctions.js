import { query } from "../../index.js";
import { notEmpty } from "../../Validation/apivalidations.js";
import * as _ from "lodash";

// Functiion to fetch all cities.
async function getCity(req, res) {
  try {
    var sid = parseInt(req.params.sid);
    if (notEmpty(sid)) {
      const city = await query(`select * from cities where state_id=${sid};`);
      if (notEmpty(city)) {
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
}

// Function to fetch all states.
async function getState(req, res) {
  try {
    var cid = parseInt(req.params.cid);
    if (Number.isInteger(cid)) {
      const state = await query(
        `select * from states where country_id=${cid};`
      );
      if (notEmpty(state)) {
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
}

// Function to fetch all countries.
async function getCountry(req, res) {
  try {
    const country = await query(`select * from countries;`);
    if (notEmpty(country)) {
      console.log(country);
      res.status(200).json({message:`Country data fetched: ${JSON.stringify(country)}`});
    } else {
      throw "Error: Incorrect fetch";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

// Function to insert user location.
async function insertLocation(req, res) {
  try {
    if (
      notEmpty(req.body.empid) &&
      notEmpty(req.body.countryid) &&
      notEmpty(req.body.stateid) &&
      notEmpty(req.body.cityid)
    ) {
      const insertLoc = await query(
        `insert into emploc (EMP_ID,COUNTRY_ID,STATE_ID,CITY_ID) values (${req.body.empid},${req.body.countryid},${req.body.stateid},${req.body.cityid});`
      );
      if (notEmpty(insertLoc)) {
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

export { getCity, getState, getCountry, insertLocation };
