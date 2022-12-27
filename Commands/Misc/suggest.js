const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggest something for the server.")
    .addStringOption((option) => option.setName("suggestion").setDescription("Your suggestion").setRequired(true)),
  async execute(interaction, client) {
    const suggestion = interaction.options.getString("suggestion");
    const channelID = "1040840533414793297";
    const guild = client.guilds.cache.get(constantsFile.mainServerID);
    const channel = guild.channels.cache.get(channelID);
    const embed = new EmbedBuilder().setColor("#8ef1ec").addFields({ name: `Suggestion from ${interaction.user.username}`, value: suggestion });
    const suggestMsg = await channel.send({ embeds: [embed] });
    suggestMsg.react("👍");
    suggestMsg.react("👎");
    interaction.reply(`Suggestion sent to <#${channelID}>!`);
  },
};
