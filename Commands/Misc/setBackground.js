const { SlashCommandBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const backgroundModel = require("../../Model/backgrounds.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setbackground")
    .setDescription("Set your background for the level card.")
    .addStringOption((option) => option.setName("link").setDescription("The link to the background you want to use").setRequired(true))
    .addStringOption((option) => option.setName("color").setDescription("The hex color for your text").setRequired(true)),
  async execute(interaction) {
    const mainGuild = await interaction.client.guilds.fetch(constantsFile.mainServerID);
    const member = await mainGuild.members.fetch(interaction.user.id);
    const backgroundURL = interaction.options.getString("link");
    const textColor = interaction.options.getString("color");
    let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

    // Booster Role or Staff Role
    if (member.roles.cache.has("1040778440149835816") || member.roles.cache.has("1040788165440577606")) {
      if (backgroundURL.includes(".png") || backgroundURL.includes(".jpg") || backgroundURL.includes(".jpeg")) {
        if (regex.test(textColor) == true) {
          const data = await backgroundModel.findOne({ memberID: interaction.user.id });
          if (data) {
            data.background = backgroundURL;
            data.color = textColor;
            data.save();
          } else {
            const newData = new backgroundModel({ memberID: interaction.user.id, background: backgroundURL, color: textColor });
            newData.save();
          }
        } else {
          interaction.reply("Invalid hex color! Please use https://htmlcolorcodes.com/color-picker/ and use the one with the # beside it!");
        }
        interaction.reply("Done!");
      } else {
        interaction.reply("Make sure your link ends in .png .jpg or .jpeg");
      }
    } else {
      interaction.reply("This can only be used by staff members or boosters");
    }
  },
};
