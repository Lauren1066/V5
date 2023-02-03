const constantsfile = require("../../../Storage/constants.js");
const canvacord = require("canvacord");
const { AttachmentBuilder } = require("discord.js");

async function backgroundCard(levelData, backgroundData, user, expModel, message) {
  expModel
    .find({
      guildID: constantsfile.mainServerID,
    })
    .sort({ level: -1, xp: -1 })
    .exec((err, res) => {
      i = 1;
      res.forEach((member) => {
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
          rank.build().then((data) => {
            const attachment = new AttachmentBuilder(data, "RankCard.png");
            message.channel.send({
              content: `${user.username} has leveled up`,
              files: [attachment],
            });
          });
        } else {
          i++;
        }
      });
    });
}
module.exports = { backgroundCard };
