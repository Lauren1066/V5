const constantFile = require("../Storage/constants.js");
const errorModel = require("../Storage/constants.js");

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
