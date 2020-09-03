import { query } from "../../index.js";
import { notEmpty } from "../../Validation/apivalidations.js";
import * as _ from "lodash";

// insert wage skills data
async function wageskilldata(req, res) {
  try {
    const empid = req.body.empid;
    const wage = req.body.wage;
    const service = req.body.service;
    const skills = req.body.skills;
    if (notEmpty(empid)) {
      if (notEmpty(wage) && notEmpty(service) && notEmpty(skills)) {
        var result = await query(
          `insert into wageperhour values (${empid},${wage}); insert into serviceprovide values(${empid},'${service}');`,
          [1, 2]
        );
        skills.forEach((item) => {
          insertskilldata(empid, item);
        });
        if (notEmpty(result)) {
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
    const result = await query(
      `insert into skillempone values(${id},${skillid})`
    );
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
export {
  wageskilldata,
};
