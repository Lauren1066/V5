const constantsFile = require("../../Storage/constants.js");
const jrModModel = require("../../Model/jrMod.js");

module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldMember, newMember) {
    const data = await jrModModel.findOne({ memberID: newMember.id });
    const hadRole = oldMember.roles.cache.some((role) => role.id === "889258147259252816");
    const hasRole = newMember.roles.cache.some((role) => role.id === "889258147259252816");

    console.log(hadRole);
    console.log(hasRole);

    if (hadRole == false && hasRole == true && oldMember.id == newMember.id) {
      if (data) {
        await jrModModel.deleteMany({ memberID: newMember.id });
      }
      const date = new Date();
      const newData = new jrModModel({
        memberID: newMember.id,
        dateAdded: date,
      });
      newData.save();
    } else if (hasRole == false && hadRole == true && oldMember.id == newMember.id) {
      await jrModModel.deleteMany({ memberID: newMember.id });
    }
  },
};
