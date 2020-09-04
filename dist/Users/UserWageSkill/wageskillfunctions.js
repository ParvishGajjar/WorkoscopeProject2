"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wageskilldata = wageskilldata;

var _index = require("../../index.js");

var _apivalidations = require("../../Validation/apivalidations.js");

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// insert wage skills data
async function wageskilldata(req, res) {
  try {
    const uid = req.body.uid;
    const perhour = req.body.perhour;
    const serviceid = req.body.serviceid;
    const skills = req.body.skills;

    if ((0, _apivalidations.notEmpty)(uid)) {
      if ((0, _apivalidations.notEmpty)(perhour) && (0, _apivalidations.notEmpty)(serviceid) && (0, _apivalidations.notEmpty)(skills)) {
        var result = await (0, _index.query)(`insert into user_profile (userid,perhour) values (${uid},${perhour}); insert into user_services (serviceid,uid) values(${serviceid},${uid});`, [1, 2]);
        skills.forEach(item => {
          insertskilldata(uid, item);
        });

        if ((0, _apivalidations.notEmpty)(result)) {
          console.log(result);
          res.send(result);
        } else {
          throw "Couldn't Insert Data";
        }
      } else {
        throw "Invalid UserID";
      }
    } else {
      throw "Error Detected";
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

async function insertskilldata(id, skillid) {
  try {
    const result = await (0, _index.query)(`insert into user_skills (userid,skills) values (${id},${skillid})`);

    if (!_.isEmpty(result)) {
      console.log(result);
      console.log("Data Inserted for " + id);
    } else {
      throw `Couldn't Insert Data for UserID: ${id}`;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}