const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const warnModel = require("../../Model/warns.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addUserOption((option) => option.setName("user").setDescription("The user to warn").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for warning them").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const warnReason = interaction.options.getString("reason");
    const guild = await interaction.client.guilds.fetch(constantsFile.mainServerID);
    const member = guild.members.cache.get(user.id);
    const punishmentChannel = await guild.channels.fetch(constantsFile.punishmentChannel);

    const data = await warnModel.findOne({
      memberID: user.id,
    });

    if (data && member.roles.cache.has(constantsFile.mainStaffrole) == false) {
      data.reasons.push(warnReason);
      data.save();
      var warnAmount = data.reasons.length;
    } else if (!data && member.roles.cache.has(constantsFile.mainStaffrole) == false) {
      const newData = new warnModel({
        memberID: user.id,
        reasons: [warnReason],
      });
      newData.save();
      var warnAmount = 1;
    } else if (member.roles.cache.has(constantsFile.mainStaffrole) == true) {
      interaction.reply("You can't warn a staff member!");
      return;
    }

    const embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle(`${user.username} has been warned!`)
      .addFields(
        { name: "Reason", value: warnReason },
        { name: "Warns", value: `${warnAmount}` },
        { name: "Moderator:", value: interaction.user.username }
      );

    punishmentChannel.send({ embeds: [embed] });

    try {
      user.send(`You have been warned in **After Hours** for **${warnReason}**!`);
    } catch {
      punishmentChannel.send("I was not able to DM the user!");
    }

    interaction.reply({ content: "User has been warned!", ephemeral: true });
  },
};
