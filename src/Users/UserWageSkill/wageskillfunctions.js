import { query } from "../../index.js";
import { notEmpty } from "../../Validation/apivalidations.js";
import * as _ from "lodash";

// insert wage skills data
async function wageskilldata(req, res) {
  try {
    const uid = req.body.uid;
    const perhour = req.body.perhour;
    const serviceid = req.body.serviceid;
    const skills = req.body.skills;
    if (notEmpty(uid)) {
      if (notEmpty(perhour) && notEmpty(serviceid) && notEmpty(skills)) {
        var result = await query(
          `insert into user_profile (userid,perhour) values (${uid},${perhour}); insert into user_services (serviceid,uid) values(${serviceid},${uid});`,
          [1, 2]
        );
        skills.forEach((item) => {
          insertskilldata(uid, item);
        });
        if (notEmpty(result)) {
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
    res.status(404).json({data:false,message:`Error: ${err}`,status:false});
  }
}

async function insertskilldata(id, skillid) {
  try {
    const result = await query(
      `insert into user_skills (userid,skills) values (${id},${skillid})`
    );
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
export {
  wageskilldata,
};
