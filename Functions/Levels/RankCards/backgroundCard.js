const constantsFile = require("../../../Storage/constants.js");
const canvacord = require("canvacord");
const { AttachmentBuilder } = require("discord.js");

async function backgroundCard(levelData, backgroundData, user, expModel, message) {
  try {
    const res = await expModel
      .find({
        guildID: constantsFile.mainServerID,
      })
      .sort({ level: -1, xp: -1 })
      .exec();

    let i = 1;
    for (const member of res) {
      if (member.memberID == levelData.memberID) {
        const xpNeeded = 5 * Math.pow(levelData.level, 2) + 60 * levelData.level + 100;
        const rank = new canvacord.Rank()
          .setAvatar(user.displayAvatarURL({ extension: "png" }))
          .setCurrentXP(levelData.xp, backgroundData.color)
          .setRequiredXP(xpNeeded, backgroundData.color)
          .setCustomStatusColor(backgroundData.color)
          .setProgressBar(backgroundData.color, "COLOR")
          .setUsername(user.username, backgroundData.color)
          .setLevel(levelData.level)
          .setLevelColor(backgroundData.color, backgroundData.color)
          .setRank(i)
          .setRankColor(backgroundData.color, backgroundData.color)
          .setOverlay(backgroundData.color, 0, false)
          .setBackground("IMAGE", backgroundData.background)
          .setDiscriminator(user.discriminator, backgroundData.color);
        const data = await rank.build();
        const attachment = new AttachmentBuilder(data, "RankCard.png");
        await message.channel.send({
          content: `${user.username} has leveled up`,
          files: [attachment],
        });
        break;
      } else {
        i++;
      }
    }
  } catch (err) {
    console.error(err);
  }
}
module.exports = { backgroundCard };
