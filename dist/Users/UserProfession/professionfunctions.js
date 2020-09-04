"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.professiondata = professiondata;
exports.updateprofession = updateprofession;

var _index = require("../../index.js");

var _apivalidations = require("../../Validation/apivalidations.js");

// import _ from "lodash";
// Insert Profession Details
async function professiondata(req, res) {
  try {
    let uid = req.body.uid;
    let usertype = req.body.usertype;
    let proftitle = req.body.proftitle;
    let company = req.body.company;
    let website = req.body.website;

    if ((0, _apivalidations.notEmpty)(uid)) {
      if (usertype == "1" && (0, _apivalidations.notEmpty)(proftitle) && (0, _apivalidations.notEmpty)(company) && (0, _apivalidations.validateURL)(website)) {
        const result = await (0, _index.query)(`insert into user_profile (uid,usertype,proftitle,company,website) values (${uid},${usertype},'${proftitle}','${company}','${website}');`);

        if ((0, _apivalidations.notEmpty)(result)) {
          console.log(result);
          res.status(200).json({
            data: true,
            message: `Data Inserted`,
            status: true
          });
        } else {
          throw "Couldn't Insert Data";
        }
      } else if (usertype == "2" && (0, _apivalidations.notEmpty)(proftitle)) {
        const result = await (0, _index.query)(`insert into user_profile (uid,usertype,proftitle,company,website) values (${uid},${usertype},'${proftitle}','${company}','${website}');`);

        if ((0, _apivalidations.notEmpty)(result)) {
          console.log(result);
          res.status(200).json({
            data: true,
            message: `Data Inserted`,
            status: true
          });
        } else {
          throw "Couldn't Insert Data";
        }
      } else {
        throw "Invalid Data";
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
} // {
//   "uid":1,
//   "usertype":2,     // 1 - Employer; 2 - Free Lancer
//   "proftitle":"Pyhton Developer",
//   "company":"",
//   "website":""
// }


async function updateprofession(req, res) {
  try {
    let uid = req.body.uid;
    let usertype = req.body.usertype;
    let proftitle = req.body.proftitle;
    let company = req.body.company;
    let website = req.body.website;

    if ((0, _apivalidations.notEmpty)(uid)) {
      if (usertype == "1" && (0, _apivalidations.notEmpty)(proftitle) && (0, _apivalidations.notEmpty)(company) && (0, _apivalidations.validateURL)(website)) {
        const result = await (0, _index.query)(`update user_profile set usertype=${usertype},proftitle='${proftitle}',company='${company}',website='${website}' where userid=${uid};`);

        if ((0, _apivalidations.notEmpty)(result)) {
          console.log("Data Updated");
          res.status(200).json({
            data: true,
            message: `Data Updated`,
            status: true
          });
        }
      } else if (usertype == "2" && (0, _apivalidations.notEmpty)(proftitle) && (0, _apivalidations.notUndefined)(company) && (0, _apivalidations.validateURL)(website)) {
        const result = await (0, _index.query)(`update user_profile set usertype=${usertype},proftitle='${proftitle}',company='${company}',website='${website}' where userid=${uid};`);

        if ((0, _apivalidations.notEmpty)(result)) {
          console.log("Data Updated");
          res.status(200).json({
            data: true,
            message: `Data Updated`,
            status: true
          });
        }
      } else {
        throw "Couldn't Update Profession";
      }
    } else {
      throw "UserID Invalid";
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