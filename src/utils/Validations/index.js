import Constants from "utils/Constants";
import Patterns from "utils/Patterns";

const isEmailValid = (val, minVal, maxVal, isRequired) => {
  if (!val || val === "") {
    return isRequired ? Constants.EMAIL_FIELD_REQUIRED : "";
  }

  if (val && val.match && val.match(Patterns.EMAIL_PATTERN) === null) {
    return Constants.EMAIL_NOT_VALID;
  }

  if (minVal && val.length < minVal) {
    return Constants.VALUE_TOO_SHORT;
  }

  if (maxVal && val.length > maxVal) {
    return Constants.VALUE_TOO_LONG;
  }

  return "";
};

const isPasswordValid = (val) => {
  if (!val) {
    return Constants.PASSWORD_FIELD_REQUIRED;
  }
  if (val.length < 8 || val.length > 16) {
    return Constants.PASSWORD_LENGTH_VALIDATION;
  }
  if (!/(?=.*[a-z])/.test(val)) {
    return Constants.PASSWORD_LOWERCASE_VALIDATION;
  }
  if (!/(?=.*[A-Z])/.test(val)) {
    return Constants.PASSWORD_UPPERCASE_VALIDATION;
  }
  if (!/\d/.test(val)) {
    return Constants.PASSWORD_DIGIT_VALIDATION;
  }
  if (!/\W/.test(val)) {
    return Constants.PASSWORD_SYMBOL_VALIDATION;
  }

  return "";
};

//  Performs basic validation on the input value and return an error message if value starts with a digit or is empty (i.e. whitespace only).
const basicValidation = (value) => {
  if (/^\d/.test(value)) {
    return Constants.INVALID_VALUEL;
  }
  if (value.trim() === "") {
    return Constants.REQUIRED;
  }
  return "";
};

// Performs basic validation on the input value and return an error message if the value is empty (i.e. whitespace only).
const basicValidation2 = (value) => {
  if (value.trim() === "") {
    return Constants.REQUIRED;
  }
  return "";
};

const Validator = {
  validate: (fieldType, fieldValue, minVal = null, maxVal = null, isRequired = true) => {
    switch (fieldType) {
      case "email":
        return isEmailValid(fieldValue, minVal, maxVal, isRequired);
      case "password":
        return isPasswordValid(fieldValue, minVal, maxVal, isRequired);
      case "basic":
        return basicValidation(fieldValue);
      case "basic2":
        return basicValidation2(fieldValue);
      default:
        return "";
    }
  },
};

export default Validator;
