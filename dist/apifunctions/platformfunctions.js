"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSimilarPlatforms = getSimilarPlatforms;
exports.insertPlatform = insertPlatform;

var _index = require("../index.js");

var _apivalidations = require("./apivalidations.js");

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Function to get similar location.
async function getSimilarPlatforms(req, res) {
  try {
    const simplatform = await (0, _index.query)(`select * from similarplatform`);

    if ((0, _apivalidations.notEmpty)(simplatform)) {
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
    if ((0, _apivalidations.notEmpty)(req.body.empid)) {
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

    if ((0, _apivalidations.notEmpty)(insertp)) {
      console.log(insertp);
    } else {
      throw "Error: Couldn't Insert Data";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}