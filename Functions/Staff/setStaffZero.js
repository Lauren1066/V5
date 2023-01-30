const messageModel = require("../../Model/messages.js");
const constantsFile = require("../../Storage/constants.js");

async function setstaffzero(client) {
  const guild = client.guilds.cache.get(constantsFile.staffServerID);
  guild.members.cache.forEach(async (member) => {
    let data = await messageModel.findOne({ memberID: member.id });
    if (!data && member.user.bot == false) {
      let newData = new messageModel({
        memberID: member.id,
        messages: 0,
      });
      newData.save();
    }
  });
}
module.exports = { setstaffzero };
