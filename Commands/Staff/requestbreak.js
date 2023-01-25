const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const jrModModel = require("../../Model/jrMod.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("requestbreak")
    .setDescription("Request a break!")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads)
    .addStringOption((option) => option.setName("reason").setDescription("The reason for your break").setRequired(true))
    .addStringOption((option) => option.setName("duration").setDescription("The duration of your break").setRequired(true)),
  async execute(interaction) {
    const guild = await interaction.client.guilds.fetch(constantsFile.staffServerID);
    if (interaction.guild.id === guild.id) {
      const reason = interaction.options.getString("reason");
      const duration = interaction.options.getString("duration");

      const breakRequestChannel = await guild.channels.fetch(constantsFile.breakRequestChannel);
      const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.tag} has requested a break`)
        .addFields({ name: "Reason", value: reason }, { name: "Duration", value: duration })
        .setFooter({ text: "Accept/Deny using using /break" });

      breakRequestChannel.send({ content: `User ID: ${interaction.user.id}`, embeds: [embed] });
      interaction.reply({ content: "Request sent!", ephemeral: true });
    } else {
      interaction.reply({ content: "This must be used in the staff server", ephemeral: true });
    }
  },
};
