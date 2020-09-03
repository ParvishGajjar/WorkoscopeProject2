import { query } from "../../index.js";
import { notEmpty } from "../../Validation/apivalidations.js";
import * as _ from "lodash";



// Insert Profession Details
async function professiondata(req, res) {
  try {
    const id = req.body.empid;
    const purpose = req.body.Purpose;
    const Proftitle = req.body.ProfTitle;
    const compname = req.body.CompName;
    const url = req.body.url;

    if (notEmpty(id)) {
      if (
        purpose === "Employer" &&
        notEmpty(Proftitle) &&
        notEmpty(compname) &&
        notEmpty(url)
      ) {
        const result = await query(
          `insert into EmpFL values (${id},'${purpose}'); insert into ProfessionData values ('${id}','${Proftitle}','${compname}','${url}');`,
          [1, 2]
        );
        if (notEmpty(result)) {
          console.log(result);
          res.send(result);
        } else {
          throw "Error: Couldn't run query";
        }
      } else if (purpose === "Free Lancer" && notEmpty(Proftitle)) {
        const result = await query(
          `insert into EmpFL values (${id},'${purpose}'); insert into ProfessionData values ('${id}','${Proftitle}','${compname}','${url}');`,
          [1, 2]
        );
        if (notEmpty(result)) {
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

export {
    professiondata,
}