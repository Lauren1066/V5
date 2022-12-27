const messageModel = require("../Model/messages.js");
const { EmbedBuilder } = require("discord.js");
const constantsFile = require("../Storage/constants.js");

async function messageLB(job, client) {
  var mainGuild = client.guilds.cache.get(constantsFile.mainServerID);
  var eventChannel = mainGuild.channels.cache.get(constantsFile.mainLBChannel);

  const next = job.nextDates(1);
  const month = next[0].month - 1;
  const date = new Date(next[0].year, month, next[0].day, next[0].hour, next[0].minute, next[0].second);
  var unixTimestamp = Math.floor(date.getTime() / 1000);

  messageModel
    .find({})
    .sort([["messages", "descending"]])
    .limit(2)
    .exec(async (err, res) => {
      if (err) console.log(err);
      if (res[0].memberID != constantsFile.ownerID) {
        const eventChannel = mainGuild.channels.cache.get(constantsFile.mainLBChannel);
        const topUser = await (await mainGuild.members.fetch(res[0].memberID)).user;

        const embed = new EmbedBuilder()
          .setTitle("Weekly Top Messenger!")
          .setColor("#8ef1ec")
          .setAuthor({ name: "After Hours", iconURL: client.user.displayAvatarURL() })
          .addFields(
            {
              name: "User:",
              value: topUser.username,
            },
            { name: "Messages:", value: `${res[0].messages}` }
          );
        eventChannel.send({
          content: `Next leaderboard update <t:${unixTimestamp}:R>\n\nCongratulations <@${topUser.id}>! DM <@693511698912641105> to claim role!`,
          embeds: [embed],
        });
      } else {
        const topUser = await (await mainGuild.members.fetch(res[1].memberID)).user;

        const embed = new EmbedBuilder()
          .setTitle("Weekly Top Messenger!")
          .setColor("#8ef1ec")
          .setAuthor({ name: "After Hours", iconURL: client.user.displayAvatarURL() })
          .addFields(
            {
              name: "User:",
              value: topUser.username,
            },
            { name: "Messages:", value: `${res[1].messages}` }
          );
        eventChannel.send({
          content: `Next leaderboard update <t:${unixTimestamp}:R>\n\nCongratulations <@${topUser.id}>! DM <@693511698912641105> to claim role!`,
          embeds: [embed],
        });
      }
      await messageModel.deleteMany({});
    });
}

module.exports = { messageLB };
