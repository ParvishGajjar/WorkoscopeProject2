import { query } from "./index.js";
import * as _ from "lodash";
async function getCity(req, res) {
  try {
    var sid = parseInt(req.params.sid);
    if (Number.isInteger(sid)) {
      const city = await query(`select * from city where STATE_ID=${sid};`);
      if (
        !_.isEmpty(city) &&
        Number.isInteger(city[0]["CITY_ID"]) &&
        typeof city !== "undefined"
      ) {
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

async function getState(req, res) {
  try {
    var cid = parseInt(req.params.cid);
    if (Number.isInteger(cid)) {
      const state = await query(`select * from state where COUNTRY_ID=${cid};`);
      if (_.isEmpty(state)) {
        console.log(state);
        res.end(JSON.stringify(state));
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
async function getCountry(req, res) {
  try {
    const country = await query(`select * from country;`);
    if (
      !_.isEmpty(country) &&
      Number.isInteger(country[0]["COUNTRY_ID"]) &&
      typeof country[0]["COUNTRY_NAME"] === "string"
    ) {
      console.log(country);
      res.end(JSON.stringify(country));
    } else {
      throw "Error: Incorrect fetch";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}
async function insertLocation(req, res) {
  try {
    if (
      Number.isInteger(req.body.empid) &&
      Number.isInteger(req.body.countryid) &&
      Number.isInteger(req.body.stateid) &&
      Number.isInteger(req.body.cityid)
    ) {
      const insertLoc = await query(
        `insert into emploc (EMP_ID,COUNTRY_ID,STATE_ID,CITY_ID) values (${req.body.empid},${req.body.countryid},${req.body.stateid},${req.body.cityid});`
      );
      if(!(_.isEmpty(insertLoc)) && (insertLoc["insertId"] !== 'null' || insertLoc["insertId"] !== 'undefined')) {
        console.log(insertLoc);
        res.send(insertLoc);
      }
      else {
        throw "Error Detected: Couldn't Insert Data"
      }
    } 
    else {
      throw "Body Parameter are Invalid";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

export { getCity, getState, getCountry, insertLocation };
