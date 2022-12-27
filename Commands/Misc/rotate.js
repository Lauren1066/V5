const { SlashCommandBuilder } = require("discord.js");
const Jimp = require("jimp");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rotate")
    .setDescription("Rotate an image.")
    .addAttachmentOption((option) => option.setName("image").setDescription("The image to rotate").setRequired(true))
    .addIntegerOption((option) => option.setName("degrees").setDescription("Degrees to rotate").setRequired(true)),
  async execute(interaction) {
    const dir = "test";
    fs.rm(dir, { recursive: true, force: true }, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${dir} is deleted!`);
    });

    const userImage = interaction.options.getAttachment("image");
    const userDegrees = interaction.options.getInteger("degrees");
    const jimpImage = await Jimp.read(userImage.url);
    await jimpImage.rotate(userDegrees, function (err) {
      if (err) throw err;
    });
    await jimpImage.resize(256, 256);
    const filePath = `test/${Date.now()}_rotate_150x150.png`;
    await jimpImage.writeAsync(filePath);
    interaction.reply({ files: [filePath] });
  },
};
