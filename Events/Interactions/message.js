const { xp } = require("../../Functions/Levels/xp.js");
const { autoresponse } = require("../../Functions/Messages/autoresponse.js");
const constantsFile = require("../../Storage/constants.js");
const messageModel = require("../../Model/messages.js");
const { modApplication } = require("../../Functions/Applications/mod.js");
const { tutorApplication } = require("../../Functions/Applications/tutor.js");
const {
  eventmanagerApplication,
} = require("../../Functions/Applications/eventmanager.js");
const applicationModel = require("../../Model/applications.js");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    // DMs
    if (message.channel.type === 1) {
      const applicationData = await applicationModel.findOne({
        memberID: message.author.id,
      });
      if (message.content.toLowerCase().includes("apply")) {
        message.reply(
          "What team would you like to apply for:\nMod\nEvents\nTutor"
        );
      } else if (
        message.content.toLowerCase().includes("mod") ||
        (applicationData && applicationData.type.toLowerCase() === "mod")
      ) {
        modApplication(message);
      } else if (
        message.content.toLowerCase().includes("tutor") ||
        (applicationData && applicationData.type.toLowerCase() === "tutor")
      ) {
        tutorApplication(message);
      } else if (
        message.content.toLowerCase().includes("events") ||
        (applicationData && applicationData.type.toLowerCase() === "events")
      ) {
        eventmanagerApplication(message);
      } else {
        return;
      }
    }

    if (message.channel.type === 0) {
      if (
        message.member.roles.cache.has(constantsFile.mainStaffrole) == false &&
        message.member.roles.cache.has(constantsFile.canReadRole) == false
      ) {
        autoresponse(message);
      }

      if (message.guild.id == constantsFile.mainServerID) {
        xp(message);
      }

      if (
        message.guild.id == constantsFile.mainServerID ||
        message.guild.id == constantsFile.staffServerID
      ) {
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
    }
  },
};
