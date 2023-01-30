const messageModel = require("../../Model/messages.js");
const { EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

async function staffCheck(client) {
  const members = await messageModel.find().where("messages").lt(25);
  const guild = await client.guilds.fetch(constantsFile.staffServerID);
  const highStaffChannel = guild.channels.cache.get(constantsFile.highStaffChannel);
  var embed = new EmbedBuilder().setTitle("Users who have less than 25 messages");

  let i = 0;
  while (i < members.length) {
    try {
      const fetchedUser = await guild.members.fetch(members[i].memberID);
      if (fetchedUser.roles.cache.has(constantsFile.retiredStaffRole) == false) {
        await embed.addFields({ name: fetchedUser.user.username, value: `${members[i].messages}` });
      }
    } catch {}
    i++;
  }
  highStaffChannel.send({ content: `Staff checks will be happening on Fridays.`, embeds: [embed] });
}
module.exports = { staffCheck };
