const messageModel = require("../../Model/messages.js");
const { EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

async function allMessages(client) {
  const client = interaction.client;
  const members = await messageModel.find();
  const guild = await client.guilds.fetch(constantsFile.staffServerID);
  const highStaffChannel = guild.channels.cache.get(constantsFile.highStaffChannel);
  var embed = new EmbedBuilder().setTitle("All weekly Messages");

  let i = 0;

  var description = "";

  while (i < members.length) {
    try {
      const fetchedUser = await guild.members.fetch(members[i].memberID);
      if (fetchedUser.roles.cache.has(constantsFile.retiredStaffRole) == false) {
        description = description + fetchedUser.user.username + ": " + `${members[i].messages} \n`;
      }
    } catch {}
    i++;
  }
  embed.setDescription(description);

  highStaffChannel.send({ content: `Staff checks will be happening on Fridays.`, embeds: [embed] });
}
module.exports = { allMessages };
