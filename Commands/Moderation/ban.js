const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) => option.setName("user").setDescription("The user to ban").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for warning them").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const banReason = interaction.options.getString("reason");
    const guild = await interaction.client.guilds.fetch(constantsFile.mainServerID);
    const member = guild.members.cache.get(user.id);
    const punishmentChannel = await guild.channels.fetch(constantsFile.punishmentChannel);

    if (member.roles.cache.has(constantsFile.mainStaffrole) == false && member.bannable) {
      try {
        await user.send(`You have been banned from **After Hours** for **${banReason}**!`);
      } catch {
        punishmentChannel.send("I was not able to DM the user!");
      }
      try {
        member.ban();
        interaction.reply({ content: "User has been banned!", ephemeral: true });
      } catch {
        interaction.reply({ content: "I could not ban that user!", ephemeral: true });
        return;
      }
      const embed = new EmbedBuilder()
        .setColor("FF0000")
        .setTitle(`${user.username} has been banned!`)
        .addFields({ name: "Reason", value: banReason }, { name: "Moderator", value: interaction.user.username });

      punishmentChannel.send({ embeds: [embed] });

      interaction.reply({ content: "User has been banned!", ephemeral: true });
    } else if (member.roles.cache.has(constantsFile.mainStaffrole) == true) {
      interaction.reply("You can't ban a staff member!");
      return;
    } else if (member.bannable == false) {
      interaction.reply({ content: "User is not bannable", ephemeral: true });
    }
  },
};
