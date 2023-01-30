const messageModel = require("../../Model/messages.js");
const { EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

async function check(staffCheckJob, client) {
  const next = staffCheckJob.nextDates(1);
  const month = next[0].month - 1;
  const date = new Date(next[0].year, month, next[0].day, next[0].hour, next[0].minute, next[0].second);
  var unixTimestamp = Math.floor(date.getTime() / 1000);

  const members = await messageModel.find().where("messages").lt(25);
  const guild = await client.guilds.fetch(constantsFile.staffServerID);
  const announceChannel = guild.channels.cache.get(constantsFile.staffLBChannel);
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
  announceChannel.send({ content: `Next staff update <t:${unixTimestamp}:R>\nStaff checks will be happening on Thursdays.`, embeds: [embed] });
}
module.exports = { check };
