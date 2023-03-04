const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const expModel = require("../../Model/Levels/exp.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forceupdate")
    .setDescription("Update level roles.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const guild = interaction.client.guilds.cache.get(constantsFile.mainServerID);
    const levelRoles = {
      50: guild.roles.cache.get("1040830102814081065"),
      40: guild.roles.cache.get("1040854023034634242"),
      30: guild.roles.cache.get("1040830099290857512"),
      20: guild.roles.cache.get("1040830095243358340"),
      10: guild.roles.cache.get("1040830091191652362"),
      5: guild.roles.cache.get("1040830087307731005"),
      1: guild.roles.cache.get("1040830062133530676"),
    };
    guild.members.cache.forEach(async (member) => {
      const memberId = member.id;
      const data = await expModel.findOne({
        guildID: constantsFile.mainServerID,
        memberID: memberId,
      });
      if (data && memberId !== constantsFile.ownerID) {
        const level = data.level;
        for (const [lvl, role] of Object.entries(levelRoles)) {
          if (level >= lvl) {
            member.roles.add(role);
          }
        }
      }
    });
    interaction.reply({ content: `Roles added`, ephemeral: true });
  },
};
