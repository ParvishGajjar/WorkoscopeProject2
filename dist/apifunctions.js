"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCity = getCity;
exports.getState = getState;
exports.getCountry = getCountry;
exports.insertLocation = insertLocation;
exports.getSimilarPlatforms = getSimilarPlatforms;
exports.insertPlatform = insertPlatform;
exports.professiondata = professiondata;

var _index = require("./index.js");

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Functiion to fetch all cities.
async function getCity(req, res) {
  try {
    var sid = parseInt(req.params.sid);

    if (Number.isInteger(sid)) {
      const city = await (0, _index.query)(`select * from city where STATE_ID=${sid};`);

      if (!_.isEmpty(city) && Number.isInteger(city[0]["CITY_ID"]) && typeof city !== "undefined") {
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
      const state = await (0, _index.query)(`select * from state where COUNTRY_ID=${cid};`);

      if (!_.isEmpty(state) && Number.isInteger(state[0]["STATE_ID"]) && typeof state !== "undefined") {
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
} // Function to fetch all countries.


async function getCountry(req, res) {
  try {
    const country = await (0, _index.query)(`select * from country;`);

    if (!_.isEmpty(country) && Number.isInteger(country[0]["COUNTRY_ID"]) && typeof country[0]["COUNTRY_NAME"] === "string") {
      console.log(country);
      res.end(JSON.stringify(country));
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
    if (Number.isInteger(req.body.empid) && Number.isInteger(req.body.countryid) && Number.isInteger(req.body.stateid) && Number.isInteger(req.body.cityid)) {
      const insertLoc = await (0, _index.query)(`insert into emploc (EMP_ID,COUNTRY_ID,STATE_ID,CITY_ID) values (${req.body.empid},${req.body.countryid},${req.body.stateid},${req.body.cityid});`);

      if (!_.isEmpty(insertLoc) && (insertLoc["insertId"] !== "null" || insertLoc["insertId"] !== "undefined")) {
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
} // Function to get similar location.


async function getSimilarPlatforms(req, res) {
  try {
    const simplatform = await (0, _index.query)(`select * from similarplatform`);

    if (!_.isEmpty(simplatform)) {
      console.log(simplatform);
      res.end(JSON.stringify(simplatform));
    } else {
      throw "Error fetching similar platforms";
    }
  } catch (err) {
    console.log(err);
    res.end(err);
  }
} // Function to insert similar platforms.


function insertPlatform(req, res) {
  try {
    if (Number.isInteger(req.body.empid) && req.body.selectedplatforms !== null) {
      req.body.selectedplatforms.forEach(item => {
        insertplatformdata(req.body.empid, item, res);
      });
      console.log("Data Inserted");
      res.send("Data Inserted");
    } else {
      throw "Error Detected";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
} // Function which will get called to insert data querybyquery.


async function insertplatformdata(empid, pid, res) {
  try {
    const insertp = await (0, _index.query)(`insert into plat_emp values(${empid},${pid});`);

    if (!_.isEmpty(insertp)) {
      console.log(insertp);
    } else {
      throw "Error: Couldn't Insert Data";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
} // {
// 	"empid":1,
// 	"Purpose":"Employer",
// 	"ProfTitle":"Python Developer",
// 	"CompName":"ABC",
// 	"url":"www.abc.com"
// }


async function professiondata(req, res) {
  try {
    const id = req.body.empid;
    const purpose = req.body.Purpose;
    const Proftitle = req.body.ProfTitle;
    const compname = req.body.CompName;
    const url = req.body.url;
    console.log(typeof id + " " + typeof purpose + " " + typeof Proftitle + " " + typeof compname + " " + typeof url);

    if (Number.isInteger(id)) {
      console.log("its int");

      if (purpose === "Employer" && Proftitle !== "" && Proftitle !== null && Proftitle !== undefined && _.isString(Proftitle) && compname !== "" && compname !== null && compname !== undefined && _.isString(compname) && url !== "" && url !== null && url !== undefined && _.isString(url)) {
        console.log("OK run queries");
        const result = await (0, _index.query)(`insert into EmpFL values (${id},'${purpose}'); insert into ProfessionData values ('${id}','${Proftitle}','${compname}','${url}');`, [1, 2]);

        if (!_.isEmpty(result) && result !== undefined) {
          console.log(result);
          res.send(result);
        } else {
          throw "Error: Couldn't run query";
        }
      } else if (purpose === "Free Lancer" && Proftitle !== "" && Proftitle !== null && Proftitle !== undefined && _.isString(Proftitle)) {
        const result = await (0, _index.query)(`insert into EmpFL values (${id},'${purpose}'); insert into ProfessionData values ('${id}','${Proftitle}','${compname}','${url}');`, [1, 2]);

        if (!_.isEmpty(result) && result !== undefined) {
          console.log(result);
          res.send(result);
        } else {
          throw "Error: Couldn't run query";
        }
      } else {
        throw "Error Detected";
      }
    } else {
      throw "Error Detected";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}