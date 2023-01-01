const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const jrModModel = require("../../Model/jrMod.js");

module.exports = {
  data: new SlashCommandBuilder().setName("jrmods").setDescription("Check when each jr mod joined!"),
  async execute(interaction) {
    const guild = await interaction.client.guilds.fetch(constantsFile.staffServerID);
    const embed = new EmbedBuilder().setTitle("JR Mods");
    const documents = await jrModModel.find({});

    await documents.forEach(async (doc) => {
      const stringDate = doc.dateAdded.toString();
      const position = stringDate.indexOf("GMT+0000 (Coordinated Universal Time)");
      const slicedString = stringDate.slice(0, position);
      const member = await guild.members.fetch(doc.memberID);
      embed.addFields({ name: member.user.username, value: slicedString });
    });

    interaction.reply({ embeds: [embed] });
  },
};
