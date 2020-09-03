import * as _ from "lodash";

// Variable is not Empty
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
