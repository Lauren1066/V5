const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const repCooldown = require("../../Model/Cooldowns/repCooldown.js");
const helperCooldown = require("../../Model/Cooldowns/helperPing.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearcooldowns")
    .setDescription("Manually remove old cooldowns.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    var deletedData = 0;
    repCooldown.find({}).exec(async (err, res) => {
      for (let i = 0; i < res.length; i++) {
        const guild = interaction.client.guilds.cache.get(constantsFile.mainServerID);
        try {
          await guild.members.fetch(`${res[i].memberID}`);
        } catch {
          await repCooldown.deleteMany({ memberID: res[i].memberID });
          deletedData++;
        }
      }
    });

    helperCooldown.find({}).exec(async (err, res) => {
      for (let i = 0; i < res.length; i++) {
        const guild = interaction.client.guilds.cache.get(constantsFile.mainServerID);
        try {
          await guild.members.fetch(`${res[i].memberID}`);
        } catch {
          await helperCooldown.deleteMany({ memberID: res[i].memberID });
          deletedData++;
        }
      }
    });
    interaction.reply(`Data deleted for ${deletedData} entries`);
  },
};
