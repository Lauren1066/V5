const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const expModel = require("../../Model/exp.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forceupdate")
    .setDescription("Update level roles.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    var guild = interaction.client.guilds.cache.get(constantsFile.mainServerID);
    guild.members.cache.forEach(async (member) => {
      let memberId = member.id;
      let data = await expModel.findOne({
        guildID: constantsFile.mainServerID,
        memberID: memberId,
      });
      if (data && memberId != constantsFile.ownerID) {
        let level = data.level;
        const levelFifty = guild.roles.cache.get("1040830102814081065");
        const levelFourty = guild.roles.cache.get("1040854023034634242");
        const levelThirty = guild.roles.cache.get("1040830099290857512");
        const levelTwenty = guild.roles.cache.get("1040830095243358340");
        const levelTen = guild.roles.cache.get("1040830091191652362");
        const levelFive = guild.roles.cache.get("1040830087307731005");
        const levelOne = guild.roles.cache.get("1040830062133530676");
        if (level >= 50) {
          member.roles.add(levelFifty);
          member.roles.add(levelFourty);
          member.roles.add(levelThirty);
          member.roles.add(levelTwenty);
          member.roles.add(levelTen);
          member.roles.add(levelFive);
          member.roles.add(levelOne);
        } else if (level >= 40) {
          member.roles.add(levelFourty);
          member.roles.add(levelThirty);
          member.roles.add(levelTwenty);
          member.roles.add(levelTen);
          member.roles.add(levelFive);
          member.roles.add(levelOne);
        } else if (level >= 30) {
          member.roles.add(levelThirty);
          member.roles.add(levelTwenty);
          member.roles.add(levelTen);
          member.roles.add(levelFive);
          member.roles.add(levelOne);
        } else if (level >= 20) {
          member.roles.add(levelTwenty);
          member.roles.add(levelTen);
          member.roles.add(levelFive);
          member.roles.add(levelOne);
        } else if (level >= 10) {
          member.roles.add(levelTen);
          member.roles.add(levelFive);
          member.roles.add(levelOne);
        } else if (level >= 5) {
          member.roles.add(levelFive);
          member.roles.add(levelOne);
        } else if (level >= 1) {
          member.roles.add(levelOne);
        }
      }
    });
    interaction.reply({ content: `Roles added`, ephemeral: true });
  },
};
