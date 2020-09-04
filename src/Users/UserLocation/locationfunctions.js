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
        res.status(200).json({
          data: true,
          message: `${JSON.stringify(city)}`,
          status: true,
        });
      } else {
        throw "Couldn't Fetch Cities";
      }
    } else {
      throw "Invalid StateID";
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ data: true, message: `Error: ${err}`, status: true });
  }
}

// Function to fetch all states.
async function getState(req, res) {
  try {
    var cid = parseInt(req.params.cid);
    if (notEmpty(cid)) {
      const state = await query(
        `select * from states where country_id=${cid};`
      );
      if (notEmpty(state)) {
        console.log(state);
        res.status(200).json({
          data: true,
          message: `${JSON.stringify(state)}`,
          status: true,
        });
      } else {
        throw "Couldn't Fetch States.";
      }
    } else {
      throw "Invalid CountryID";
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ data: true, message: `Error: ${err}`, status: true });
  }
}

// Function to fetch all countries.
async function getCountry(req, res) {
  try {
    const country = await query(`select * from countries;`);
    if (notEmpty(country)) {
      console.log(country);
      res.status(200).json({
        data: true,
        message: `${JSON.stringify(country)}`,
        status: true,
      });
    } else {
      throw "Couldn't Fetch Countries";
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ data: false, message: `Error: ${err}`, status: false });
  }
}

// Function to insert user location.
async function insertLocation(req, res) {
  try {
    if (
      notEmpty(req.body.uid) &&
      notEmpty(req.body.countryid) &&
      notEmpty(req.body.stateid) &&
      notEmpty(req.body.cityid)
    ) {
      const result = await query(
        `insert into user_profile (userid,country,state,city) values (${req.body.uid},${req.body.countryid},${req.body.stateid},${req.body.cityid});`
      );
      if (notEmpty(result)) {
        console.log(result);
        res
          .status(200)
          .json({ data: true, message: "Data Updated", status: true });
      } else {
        throw "Couldn't Insert Data";
      }
    } else {
      throw "Body Parameter are Invalid";
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ data: false, messgae: `Error: ${err}`, status: false });
  }
}

async function updateLocation(req, res) {
  try {
    if (
      notEmpty(req.body.uid) &&
      notEmpty(req.body.countryid) &&
      notEmpty(req.body.stateid) &&
      notEmpty(req.body.cityid)
    ) {
      var result = await query(
        `update user_profile set country=${req.body.countryid},state=${req.body.stateid},city=${req.body.cityid} where userid=${req.body.uid}`
      );
      if (notEmpty(result)) {
        console.log(result);
        res
          .status(200)
          .json({ data: true, message: "Data Updated", status: true });
      } else {
        throw "Couldn't Update Data";
      }
    } else {
      throw "Invalid Body Parameters";
    }
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ data: false, messgae: `Error: ${error}`, status: false });
  }
}

async function searchLocation(req, res) {
  try {
    const uid=parseInt(req.params.uid)
    if (notEmpty(uid)) {
      const result = await query(
        `select userid,country,state,city from user_profile where userid=${uid};`
      );
      if (notEmpty(result)) {
        console.log(result);
        res
          .status(200)
          .json({ data: true, message: `${result}`, status: true });
      } else {
        throw "Couldn't Search/Find Data";
      }
    } else {
      throw "Invalid UserID";
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ data: false, message: `Error: ${err}`, status: false });
  }
}
export {
  getCity,
  getState,
  getCountry,
  insertLocation,
  updateLocation,
  searchLocation,
};
