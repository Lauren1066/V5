const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord");
const expModel = require("../../Model/Levels/exp.js");
const constantsFile = require("../../Storage/constants.js");
const backgroundModel = require("../../Model/Levels/backgrounds.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("See someone's level card.")
    .addUserOption((option) => option.setName("target").setDescription("The user to check")),
  async execute(interaction) {
    const providedUser = interaction.options.getUser("target");
    const user = providedUser ? providedUser : interaction.user;
    const userID = providedUser ? providedUser.id : interaction.user.id;
    let data = await expModel.findOne({
      guildID: constantsFile.mainServerID,
      memberID: userID,
    });
    let backgroundData = await backgroundModel.findOne({ memberID: userID });

    if (data && backgroundData) {
      try {
        expModel
          .find({
            guildID: constantsFile.mainServerID,
          })
          .sort({ level: -1, xp: -1 })
          .exec(async (err, res) => {
            i = 1;
            await res.forEach((member) => {
              if (member.memberID == data.memberID) {
                const xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;
                const rank = new canvacord.Rank()
                  .setAvatar(user.displayAvatarURL({ extension: "png" }))
                  .setCurrentXP(data.xp, backgroundData.color)
                  .setRequiredXP(xpNeeded, backgroundData.color)
                  .setCustomStatusColor(backgroundData.color)
                  .setProgressBar(backgroundData.color, "COLOR")
                  .setUsername(user.username, backgroundData.color)
                  .setLevel(data.level)
                  .setLevelColor(backgroundData.color, backgroundData.color)
                  .setRank(i)
                  .setRankColor(backgroundData.color, backgroundData.color)
                  .setOverlay(backgroundData.color, 0, false)
                  .setBackground("IMAGE", backgroundData.background)
                  .setDiscriminator(user.discriminator, backgroundData.color);
                rank.build().then((data) => {
                  const attachment = new AttachmentBuilder(data, "RankCard.png");
                  interaction.reply({
                    files: [attachment],
                  });
                });
              } else {
                i++;
              }
            });
          });
      } catch {
        expModel
          .find({
            guildID: constantsFile.mainServerID,
          })
          .sort({ level: -1, xp: -1 })
          .exec((err, res) => {
            i = 1;
            res.forEach((member) => {
              if (member.memberID == data.memberID) {
                const xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;
                const rank = new canvacord.Rank()
                  .setAvatar(user.displayAvatarURL({ extension: "png" }))
                  .setCurrentXP(data.xp, "#ffffff")
                  .setRequiredXP(xpNeeded, "#ffffff")
                  .setCustomStatusColor("#ffffff")
                  .setProgressBar("#ffffff", "COLOR")
                  .setUsername(user.username, "#ffffff")
                  .setLevel(data.level)
                  .setLevelColor("#ffffff", "#ffffff")
                  .setRank(i)
                  .setRankColor("#ffffff", "#ffffff")
                  .setOverlay("#ffffff", 0, false)
                  .setBackground("COLOR", "#000001")
                  .setDiscriminator(user.discriminator, "#ffffff");
                rank.build().then((data) => {
                  const attachment = new AttachmentBuilder(data, "RankCard.png");
                  interaction.reply({
                    content: "I was unable to use your custom background! Please double check the link",
                    files: [attachment],
                  });
                });
              } else {
                i++;
              }
            });
          });
      }
    } else if (!backgroundData) {
      expModel
        .find({
          guildID: constantsFile.mainServerID,
        })
        .sort({ level: -1, xp: -1 })
        .exec((err, res) => {
          i = 1;
          res.forEach((member) => {
            if (member.memberID == data.memberID) {
              const xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;
              const rank = new canvacord.Rank()
                .setAvatar(user.displayAvatarURL({ extension: "png" }))
                .setCurrentXP(data.xp, "#ffffff")
                .setRequiredXP(xpNeeded, "#ffffff")
                .setCustomStatusColor("#ffffff")
                .setProgressBar("#ffffff", "COLOR")
                .setUsername(user.username, "#ffffff")
                .setLevel(data.level)
                .setLevelColor("#ffffff", "#ffffff")
                .setRank(i)
                .setRankColor("#ffffff", "#ffffff")
                .setOverlay("#ffffff", 0, false)
                .setBackground("COLOR", "#000001")
                .setDiscriminator(user.discriminator, "#ffffff");
              rank.build().then((data) => {
                const attachment = new AttachmentBuilder(data, "RankCard.png");
                interaction.reply({
                  files: [attachment],
                });
              });
            } else {
              i++;
            }
          });
        });
    } else {
      interaction.reply("No data for this user was found!");
    }
  },
};
