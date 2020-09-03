import { query } from "../../index.js";
import { notEmpty } from "../../Validation/apivalidations.js";
import * as _ from "lodash";

// Function to get similar location.
async function getSimilarPlatforms(req, res) {
  try {
    const simplatform = await query(`select * from similarplatform`);
    if (notEmpty(simplatform)) {
      console.log(simplatform);
      res.end(JSON.stringify(simplatform));
    } else {
      throw "Error fetching similar platforms";
    }
  } catch (err) {
    console.log(err);
    res.end(err);
  }
}

// Function to insert similar platforms.
function insertPlatform(req, res) {
  try {
    if (notEmpty(req.body.empid)) {
      req.body.selectedplatforms.forEach((item) => {
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
}

// Function which will get called to insert data querybyquery.
async function insertplatformdata(empid, pid, res) {
  try {
    const insertp = await query(
      `insert into plat_emp values(${empid},${pid});`
    );
    if (notEmpty(insertp)) {
      console.log(insertp);
    } else {
      throw "Error: Couldn't Insert Data";
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

export { getSimilarPlatforms, insertPlatform };
