const { xp } = require("../../Functions/xp.js");
const { autoresponse } = require("../../Functions/autoresponse.js");
const constantsFile = require("../../Storage/constants.js");
const messageModel = require("../../Model/messages.js");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    autoresponse(message);
    xp(message);

    if (message.guild.id == constantsFile.mainServerID || message.guild.id == constantsFile.staffServerID) {
      const data = await messageModel.findOne({
        memberID: message.author.id,
      });
      if (data) {
        data.messages++;
        data.save();
      } else if (!data) {
        let newData = new messageModel({
          memberID: message.author.id,
          messages: 1,
        });
        newData.save();
      }
    }
  },
};