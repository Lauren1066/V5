const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const jrModModel = require("../../Model/jrMod.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("break")
    .setDescription("Decide on a break!")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) => option.setName("id").setDescription("The id of the user").setRequired(true))
    .addBooleanOption((option) => option.setName("accept").setDescription("Accept (true) or Deny (false) the request").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for your decision")),
  async execute(interaction) {
    const guild = await interaction.client.guilds.fetch(constantsFile.staffServerID);
    if (interaction.guild.id === guild.id) {
      var reason = interaction.options.getString("reason");
      const id = interaction.options.getString("id");
      const decision = interaction.options.getBoolean("accept");

      const breakLogsChannel = await guild.channels.fetch(constantsFile.breakLogsChannel);
      if (decision == true) {
        var stringDecision = "accepted";
      } else {
        var stringDecision = "denied";
      }
      if (!reason) {
        var reason = "no reason provided";
      }

      breakLogsChannel.send(`<@${id}> your request has been ${stringDecision} for ${reason}`);
      interaction.reply({ content: "Decision sent!", ephemeral: true });
    } else {
      interaction.reply({ content: "This must be used in the staff server", ephemeral: true });
    }
  },
};
