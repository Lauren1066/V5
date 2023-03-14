const { xp } = require("../../Functions/Levels/xp.js");
const { autoresponse } = require("../../Functions/Messages/autoresponse.js");
const constantsFile = require("../../Storage/constants.js");
const messageModel = require("../../Model/messages.js");
const { modApplication } = require("../../Functions/Applications/mod.js");
const { tutorApplication } = require("../../Functions/Applications/tutor.js");
const { eventmanagerApplication } = require("../../Functions/Applications/eventmanager.js");
const applicationModel = require("../../Model/Staff/applications.js");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    const guild = await message.client.guilds.fetch(constantsFile.mainServerID);
    const member = await guild.members.fetch(message.author.id);

    // DMs
    if (message.channel.type === 1 && member.roles.cache.has(constantsFile.levelfiverole)) {
      const applicationData = await applicationModel.findOne({
        memberID: message.author.id,
      });
      if (message.content.toLowerCase().includes("apply")) {
        message.reply("What team would you like to apply for:\nMod\nEvents\nTutor");
      } else if (message.content.toLowerCase() == "cancel" && applicationData && applicationData.answers.length < applicationData.questions.length) {
        await applicationModel.findOneAndDelete({ memberID: message.author.id });
        message.reply("Application cancelled!");
      } else if (message.content.toLowerCase().includes("mod") || (applicationData && applicationData.type.toLowerCase() === "mod")) {
        modApplication(message);
      } else if (message.content.toLowerCase().includes("tutor") || (applicationData && applicationData.type.toLowerCase() === "tutor")) {
        tutorApplication(message);
      } else if (message.content.toLowerCase().includes("events") || (applicationData && applicationData.type.toLowerCase() === "events")) {
        eventmanagerApplication(message);
      } else {
        return;
      }
    } else if (message.channel.type === 1 && !member.roles.cache.has(constantsFile.levelfiverole)) {
      message.reply("You must be level 5 to apply!");
    }

    if (message.channel.type === 0) {
      if (message.author.id === "977473891389833247") {
        message.reply("Is that a JoJo reference?");
      }
      if (
        message.member.roles.cache.has(constantsFile.mainStaffrole) == false &&
        message.member.roles.cache.has(constantsFile.canReadRole) == false
      ) {
        autoresponse(message);
      }

      if (message.guild.id == constantsFile.mainServerID) {
        xp(message);
      }

      if (message.guild.id == constantsFile.mainServerID || message.guild.id == constantsFile.staffServerID) {
        const data = await messageModel.findOne({
          memberID: message.author.id,
        });
        if (data) {
          data.messages++;
          data.save();
        } else if (!data) {
          messageModel.create({ memberID: message.author.id, messages: 1 });
        }
      }
    }
  },
};
