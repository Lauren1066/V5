const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const Canvas = require("canvas");
const { registerFont } = require("canvas");

const path = require("path");

module.exports = {
  data: new SlashCommandBuilder().setName("welcomecard").setDescription("Emit the welcome event!"),
  async execute(interaction) {
    registerFont(require("@canvas-fonts/arial-bold"), { family: "Arial Bold" });
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#3a31a3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width - 20;
    const height = canvas.height - 20;

    const filePath = path.join(__dirname, "/wallpaper.jpg");
    const background = await Canvas.loadImage(filePath);
    ctx.drawImage(background, 10, 10, width, height);
    // ctx.fillStyle = "#000";
    // ctx.fillRect(10, 10, width, height);

    const middleWdith = (width - 225) / 2;

    // ctx.strokeStyle = "red";
    // ctx.moveTo(middleWdith + 225, 20);
    // ctx.textAlign = "center";

    const newHeight = (1 / 3) * (height - 70);
    const twoThirdsHeight = (2 / 3) * (height - 70);
    const wholeHeight = height - 70;
    // canvas.height / 2.2

    ctx.textAlign = "center";

    ctx.font = '28px "Arial Bold"';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${interaction.user.tag}`, middleWdith + 225, newHeight + 65);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`You are Member #${interaction.guild.memberCount}`, middleWdith + 225, twoThirdsHeight + 65);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Enjoy your stay!`, middleWdith + 225, wholeHeight + 65);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: "jpg" }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), "welcome-image.png");

    interaction.reply({ files: [attachment] });
  },
};
