"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wageskilldata = wageskilldata;

var _index = require("../index.js");

var _apivalidations = require("./apivalidations.js");

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// insert wage skills data
async function wageskilldata(req, res) {
  try {
    const empid = req.body.empid;
    const wage = req.body.wage;
    const service = req.body.service;
    const skills = req.body.skills;

    if ((0, _apivalidations.notEmpty)(empid)) {
      if ((0, _apivalidations.notEmpty)(wage) && (0, _apivalidations.notEmpty)(service) && (0, _apivalidations.notEmpty)(skills)) {
        var result = await (0, _index.query)(`insert into wageperhour values (${empid},${wage}); insert into serviceprovide values(${empid},'${service}');`, [1, 2]);
        skills.forEach(item => {
          insertskilldata(empid, item);
        });

        if ((0, _apivalidations.notEmpty)(result)) {
          console.log(result);
          res.send(result);
        } else {
          throw "Error running query";
        }
      } else {
        throw "Error: Empid isn't integer";
      }
    } else {
      throw "Error Detected";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

async function insertskilldata(id, skillid) {
  try {
    const result = await (0, _index.query)(`insert into skillempone values(${id},${skillid})`);

    if (!_.isEmpty(result)) {
      console.log(result);
      console.log("Data Inserted for " + id);
    } else {
      throw "Error Found while inserting";
    }
  } catch (err) {
    console.log(err);
  }
}