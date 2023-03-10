const constantsFile = require("../../../Storage/constants.js");
const { AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord");

async function card(levelData, user, expModel, message) {
  try {
    const leaderboard = await expModel
      .find({
        guildID: constantsFile.mainServerID,
      })
      .sort({ level: -1, xp: -1 });

    const rank = leaderboard.findIndex((element) => element.memberID === levelData.memberID) + 1;

    const xpNeeded = 5 * Math.pow(levelData.level, 2) + 60 * levelData.level + 100;

    const image = await new canvacord.Rank()
      .setAvatar(user.displayAvatarURL({ extension: "png" }))
      .setCurrentXP(levelData.xp, "#ffffff")
      .setRequiredXP(xpNeeded, "#ffffff")
      .setCustomStatusColor("#ffffff")
      .setProgressBar("#ffffff", "COLOR")
      .setUsername(user.username, "#ffffff")
      .setLevel(levelData.level)
      .setLevelColor("#ffffff", "#ffffff")
      .setRank(rank)
      .setRankColor("#ffffff", "#ffffff")
      .setOverlay("#ffffff", 0, false)
      .setBackground("COLOR", "#000001")
      .setDiscriminator(user.discriminator, "#ffffff")
      .build();

    const attachment = new AttachmentBuilder(image, "RankCard.png");
    message.channel.send({ files: [attachment] });
  } catch (err) {
    console.error(err);
    message.reply("Error retrieving leaderboard data.");
  }
}

module.exports = { card };
