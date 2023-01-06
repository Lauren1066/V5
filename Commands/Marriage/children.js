const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const adoptModel = require("../../Model/parents.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder().setName("children").setDescription("List your children."),
  async execute(interaction) {
    const data = await adoptModel.findOne({ parentID: interaction.user.id });
    if (data) {
      const embed = new EmbedBuilder().setTitle(`${interaction.user.username}'s children`);
      const guild = await interaction.client.guilds.fetch(constantsFile.mainServerID);
      i = 1;
      await data.children.forEach(async (child) => {
        if (child.accepted == true) {
          const childUser = await guild.members.fetch(child.childID);
          embed.addFields({ name: `${i}`, value: `${childUser.user.username}` });
        }
        i++;
      });
      interaction.reply({ embeds: [embed] });
    } else {
      interaction.reply("You have no children!");
    }
  },
};
