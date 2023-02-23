const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const messageModel = require("../../Model/messages.js");
const constantsFile = require("../../Storage/constants.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("forcestaffcheck")
    .setDescription("Check who needs more messages!")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    await interaction.deferReply();
    const members = await messageModel.find().where("messages").lt(25);
    const guild = await interaction.client.guilds.fetch(constantsFile.staffServerID);
    var embed = new EmbedBuilder().setTitle("Users who have less than 25 messages");

    let i = 0;
    while (i < members.length) {
      try {
        const fetchedUser = await guild.members.fetch(members[i].memberID);
        if (fetchedUser.roles.cache.has(constantsFile.retiredStaffRole) == false && fetchedUser.roles.cache.has("889258906797371402")) {
          await embed.addFields({ name: fetchedUser.user.username, value: `${members[i].messages}` });
        }
      } catch {}
      i++;
    }
    interaction.editReply({ embeds: [embed] });
  },
};
