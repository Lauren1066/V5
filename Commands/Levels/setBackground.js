const { SlashCommandBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const backgroundModel = require("../../Model/Levels/backgrounds.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setbackground")
    .setDescription("Set your background for the level card.")
    .addStringOption((option) => option.setName("link").setDescription("The link to the background you want to use"))
    .addStringOption((option) => option.setName("color").setDescription("The hex color for your text")),
  async execute(interaction) {
    const mainGuild = await interaction.client.guilds.fetch(constantsFile.mainServerID);
    const member = await mainGuild.members.fetch(interaction.user.id);

    const backgroundURL = interaction.options.getString("link");
    const textColor = interaction.options.getString("color");

    let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

    // Booster Role or Staff Role
    if (member.roles.cache.has("1040778440149835816") || member.roles.cache.has("1040788165440577606")) {
      const data = await backgroundModel.findOne({ memberID: interaction.user.id });
      if (data) {
        if (backgroundURL && textColor && regex.test(textColor) == true) {
          if (backgroundURL.includes(".png") || backgroundURL.includes(".jpg") || backgroundURL.includes(".jpeg")) {
            data.background = backgroundURL;
            data.color = textColor;
            data.save();
          } else {
            interaction.reply("Make sure your link ends in .png .jpg or .jpeg");
          }
        } else if (backgroundURL) {
          if (backgroundURL.includes(".png") || backgroundURL.includes(".jpg") || backgroundURL.includes(".jpeg")) {
            data.background = backgroundURL;
            data.save();
          } else {
            interaction.reply("Make sure your link ends in .png .jpg or .jpeg");
          }
        } else if (textColor && regex.test(textColor) == true) {
          data.color = textColor;
          data.save();
        } else if (textColor && regex.test(textColor) == false) {
          interaction.reply("Invalid hex color! Please use https://htmlcolorcodes.com/color-picker/ and use the one with the # beside it!");
        } else {
          interaction.reply("Please provide at least one parameter to change!");
        }
      } else {
        if (backgroundURL && textColor && regex.test(textColor) == true) {
          if (backgroundURL.includes(".png") || backgroundURL.includes(".jpg") || backgroundURL.includes(".jpeg")) {
            const newData = new backgroundModel({ memberID: interaction.user.id, background: backgroundURL, color: textColor });
            newData.save();
          } else {
            interaction.reply("Make sure your link ends in .png .jpg or .jpeg");
          }
        } else if (backgroundURL) {
          if (backgroundURL.includes(".png") || backgroundURL.includes(".jpg") || backgroundURL.includes(".jpeg")) {
            const newData = new backgroundModel({ memberID: interaction.user.id, background: backgroundURL, color: "#FFF" });
            newData.save();
          } else {
            interaction.reply("Make sure your link ends in .png .jpg or .jpeg");
          }
        } else if (textColor && regex.test(textColor) == true) {
          const newData = new backgroundModel({
            memberID: interaction.user.id,
            background: "https://t4.ftcdn.net/jpg/04/92/22/93/360_F_492229389_5ve1bCKgYrLRHpCj3o4FAzz60efaZgG0.jpg",
            color: textColor,
          });
          newData.save();
        } else if (textColor && regex.test(textColor) == false) {
          interaction.reply("Invalid hex color! Please use https://htmlcolorcodes.com/color-picker/ and use the one with the # beside it!");
        } else {
          interaction.reply("Please provide at least one parameter to change!");
        }
      }
      interaction.reply("Done!");
    } else {
      interaction.reply("This can only be used by staff members or boosters");
    }
  },
};
