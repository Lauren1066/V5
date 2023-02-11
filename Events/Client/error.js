const constantsFile = require("../../Storage/constants.js");
const errorModel = require("../../Model/errors.js");

module.exports = {
  name: "error",
  once: false,
  async execute(error) {
    const errorData = await errorModel.findOne({});
    if (!errorData) {
      const newError = new errorModel({
        errorArray: [error],
      });
      newError.save();
    } else {
      errorData.errorArray.push(error);
    }
    console.error(error);
  },
};
