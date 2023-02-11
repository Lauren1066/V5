const constantsFile = require("../../../Storage/constants.js");
const { AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord");

async function card(levelData, user, expModel, message) {
  expModel
    .find({
      guildID: constantsFile.mainServerID,
    })
    .sort({ level: -1, xp: -1 })
    .exec((err, res) => {
      i = 1;
      res.forEach((member) => {
        if (member.memberID == levelData.memberID) {
          const xpNeeded = 5 * Math.pow(levelData.level, 2) + 60 * levelData.level + 100;
          const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ extension: "png" }))
            .setCurrentXP(levelData.xp, "#ffffff")
            .setRequiredXP(xpNeeded, "#ffffff")
            .setCustomStatusColor("#ffffff")
            .setProgressBar("#ffffff", "COLOR")
            .setUsername(user.username, "#ffffff")
            .setLevel(levelData.level)
            .setLevelColor("#ffffff", "#ffffff")
            .setRank(i)
            .setRankColor("#ffffff", "#ffffff")
            .setOverlay("#ffffff", 0, false)
            .setBackground("COLOR", "#000001")
            .setDiscriminator(user.discriminator, "#ffffff");
          rank.build().then((data) => {
            const attachment = new AttachmentBuilder(data, "RankCard.png");
            message.channel.send({
              files: [attachment],
            });
          });
        } else {
          i++;
        }
      });
    });
}
module.exports = { card };
