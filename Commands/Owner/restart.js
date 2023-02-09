const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
module.exports = {
  data: new SlashCommandBuilder().setName("restart").setDescription("Restart the bot").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    var request = require("request");
    var options = {
      method: "POST",
      url: "https://control.sparkedhost.us/api/client/servers/36ad70ce/power?signal=restart",
      headers: {
        Authorization: "ptlc_29ve5ypCP38L2dXffbTp0okKrGzlGhbEGdqnaRYlr4h",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      formData: {},
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      interaction.reply(response.body);
    });
  },
};
