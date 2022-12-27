const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord");
const expModel = require("../../Model/exp.js");
const constantsFile = require("../../Storage/constants.js");

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
    if (data) {
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
