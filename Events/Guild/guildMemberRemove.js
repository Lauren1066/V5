const messageModel = require("../../Model/messages.js");
const expModel = require("../../Model/exp.js");
const repCooldown = require("../../Model/Cooldowns/repCooldown.js");
const helperCooldown = require("../../Model/Cooldowns/helperPing.js");
const codesModel = require("../../Model/codes.js");

module.exports = {
  name: "guildMemberRemove",
  once: false,
  async execute(member) {
    console.log(`${member.id} has left the server`);
    if (member.guild.id == "1040773239607140485") {
      await messageModel.findOneAndDelete({ memberID: member.id });
      await expModel.findOneAndDelete({ memberID: member.id });
      await repCooldown.findOneAndDelete({ memberID: member.id });
      await helperCooldown.findOneAndDelete({ memberID: member.id });
    } else if (member.guild.id == "888922290371330058") {
      await codesModel.findOneAndDelete({ memberID: member.id });
    }
  },
};
