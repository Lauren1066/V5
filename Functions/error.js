const constantsFile = require("../Storage/constants.js");
const errorModel = require("../Model/errors.js");

async function errorFunc(error) {
  const errorData = await errorModel.findOne({});
  if (!errorData) {
    const newError = new errorModel({
      errorArray: [error],
    });
    newError.save();
  } else {
    errorData.errorArray.push(error);
  }
}
module.exports = { errorFunc };
