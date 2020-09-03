import * as _ from "lodash";

// function intNotEmpty(val){
//     if(_.isInteger(val) && val !== null && val !== undefined){
//         return true;
//     }
//     return false;
// }
// function stringNotEmpty(val){
//     if(!_.isEmpty(val) && val !== null && val !== undefined && _.isString(val)){
//         return true;
//     }
//     return false;
// }
// function objectNotEmpty(val){
//     if(!_.isEmpty(val) && val !== null && val !== undefined){
//         return true;
//     }
//     return false;
// }

function notEmpty(val) {
  if (typeof val === "number") {
    //Number Validation
    if (val !== null && val !== undefined) {
      return true;
    } else {
      return false;
    }
  } else if (typeof val === "string") {
    //String Validation
    if (!_.isEmpty(val) && val !== null && val !== undefined && val !== "") {
      return true;
    } else {
      return false;
    }
  } else if (typeof val === "object") {
    //Object Validation
    if (!_.isEmpty(val) && val !== null && val !== undefined) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export { notEmpty };
