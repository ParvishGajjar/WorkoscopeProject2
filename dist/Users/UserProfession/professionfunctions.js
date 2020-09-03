"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.professiondata = professiondata;

var _index = require("../../index.js");

var _apivalidations = require("../../Validation/apivalidations.js");

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Insert Profession Details
async function professiondata(req, res) {
  try {
    const id = req.body.empid;
    const purpose = req.body.Purpose;
    const Proftitle = req.body.ProfTitle;
    const compname = req.body.CompName;
    const url = req.body.url;

    if ((0, _apivalidations.notEmpty)(id)) {
      if (purpose === "Employer" && (0, _apivalidations.notEmpty)(Proftitle) && (0, _apivalidations.notEmpty)(compname) && (0, _apivalidations.notEmpty)(url)) {
        const result = await (0, _index.query)(`insert into EmpFL values (${id},'${purpose}'); insert into ProfessionData values ('${id}','${Proftitle}','${compname}','${url}');`, [1, 2]);

        if ((0, _apivalidations.notEmpty)(result)) {
          console.log(result);
          res.send(result);
        } else {
          throw "Error: Couldn't run query";
        }
      } else if (purpose === "Free Lancer" && (0, _apivalidations.notEmpty)(Proftitle)) {
        const result = await (0, _index.query)(`insert into EmpFL values (${id},'${purpose}'); insert into ProfessionData values ('${id}','${Proftitle}','${compname}','${url}');`, [1, 2]);

        if ((0, _apivalidations.notEmpty)(result)) {
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