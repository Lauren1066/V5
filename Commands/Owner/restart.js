const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const axios = require("axios");
module.exports = {
  data: new SlashCommandBuilder().setName("restart").setDescription("Restart the bot").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const apiKey = "ptlc_29ve5ypCP38L2dXffbTp0okKrGzlGhbEGdqnaRYlr4h";
    const url = "https://control.sparkedhost.us/api/client/servers/36ad70ce/power?signal=restart";

    axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(`${response.status}: ${response.statusText}`);
        if (response.status == 204) {
          interaction.reply("Restarting!");
        }
      })
      .catch(function (error) {
        console.log(`${error.code}`);
        interaction.reply("An error occured!");
      });
  },
};
