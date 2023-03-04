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
    const user = providedUser || interaction.user;
    const userID = providedUser ? providedUser.id : interaction.user.id;

    const data = await expModel.findOne({
      guildID: constantsFile.mainServerID,
      memberID: userID,
    });

    if (!data) {
      return interaction.reply("No data for this user was found!");
    }

    const backgroundData = await backgroundModel.findOne({ memberID: userID });

    const xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;
    const color = backgroundData ? backgroundData.color : "#ffffff";
    const background = backgroundData ? backgroundData.background : "#000001";

    const rank = new canvacord.Rank()
      .setAvatar(user.displayAvatarURL({ extension: "png" }))
      .setCurrentXP(data.xp, color)
      .setRequiredXP(xpNeeded, color)
      .setCustomStatusColor(color)
      .setProgressBar(color, "COLOR")
      .setUsername(user.username, color)
      .setLevel(data.level)
      .setLevelColor(color, color)
      .setRankColor(color, color)
      .setOverlay(color, 0, false)
      .setDiscriminator(user.discriminator, color);

    if (backgroundData) {
      rank.setBackground("IMAGE", background);
    } else {
      rank.setBackground("COLOR", background);
    }

    const attachment = new AttachmentBuilder(await rank.build(), "RankCard.png");
    interaction.reply({ files: [attachment] });
  },
};
