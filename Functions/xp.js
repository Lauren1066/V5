const canvacord = require("canvacord");
const expModel = require("../Model/exp.js");
const { AttachmentBuilder } = require("discord.js");
const constantsfile = require("../Storage/constants.js");
async function xp(message) {
  if (message.guild.id != "1040773239607140485") return;

  let data = await expModel.findOne({
    guildID: message.guild.id,
    memberID: message.author.id,
  });
  const randomNumber = Math.floor(Math.random() * 8) + 12;
  const guild = await message.client.guilds.fetch(constantsfile.mainServerID);
  if (data) {
    x = data.xp + randomNumber;
    data.xp = x;

    var level = data.level;
    var xp = data.xp;
    var xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;
    if (xpNeeded < xp) {
      z = level + 1;
      data.level = z;
      y = data.xp - xpNeeded;
      data.xp = y;
      const user = message.author;
      expModel
        .find({
          guildID: message.guild.id,
        })
        .sort({ level: -1, xp: -1 })
        .exec((err, res) => {
          i = 1;
          res.forEach((member) => {
            if (member.memberID == data.memberID) {
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
                message.channel.send({
                  content: `<@${message.author.id}> has leveled up to level ${z}`,
                  files: [attachment],
                });
              });
            } else {
              i++;
            }
          });
          if (z == 5) {
            let role = guild.roles.cache.get(constantsfile.levelfiverole);
            message.member.roles.add(role);
          } else if (z == 10) {
            let role = guild.roles.cache.get(constantsfile.leveltenrole);
            message.member.roles.add(role);
          } else if (z == 20) {
            let role = guild.roles.cache.get(constantsfile.leveltwentyrole);
            message.member.roles.add(role);
          } else if (z == 30) {
            let role = guild.roles.cache.get(constantsfile.levelthirtyrole);
            message.member.roles.add(role);
          } else if (z == 40) {
            let role = guild.roles.cache.get(constantsfile.levelfortyrole);
            message.member.roles.add(role);
          } else if (z == 50) {
            let role = guild.roles.cache.get(constantsfile.levelfiftyrole);
            message.member.roles.add(role);
          }
        });
    }
    data.save();
  } else {
    let newExp = new expModel({
      guildID: message.guild.id,
      xp: randomNumber,
      memberID: message.author.id,
      level: 0,
    });
    newExp.save();
    let role = guild.roles.cache.get(constantsfile.levelonerole);
    message.member.roles.add(role);
  }
}

module.exports = { xp };
