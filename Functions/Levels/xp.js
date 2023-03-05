// Require everything
const rn = require("random-number");
const expModel = require("../../Model/Levels/exp.js");
const constantsFile = require("../../Storage/constants.js");
const backgroundModel = require("../../Model/Levels/backgrounds.js");
const { checkLevel } = require("./checkLevel.js");
const { card } = require("./RankCards/card.js");
const { backgroundCard } = require("./RankCards/backgroundCard.js");

// Start the function
async function xp(message) {
  // Find the data and get main server
  const guild = await message.client.guilds.fetch(constantsFile.mainServerID);
  const levelData = await expModel.findOne({ guildID: constantsFile.mainServerID, memberID: message.author.id });
  const backgroundData = await backgroundModel.findOne({ memberID: message.author.id });

  // Get the random XP amount
  const options = {
    min: constantsFile.minXP,
    max: constantsFile.maxXp,
    integer: true,
  };
  const randomNumber = rn(options);

  if (levelData) {
    let { level, xp } = levelData;
    const xpNeeded = 5 * Math.pow(level, 2) + 60 * level + 100;
    xp += randomNumber;

    if (xpNeeded <= xp) {
      level++;
      xp -= xpNeeded;

      try {
        backgroundCard(levelData, backgroundData, message.author, expModel, message);
      } catch (error) {
        console.log(error);
        card(levelData, message.author, expModel, message);
        message.channel.send("Your custom card does not seem to be working!");
      }

      checkLevel(level, guild, message.member);
    }

    levelData.save();
  } else {
    expModel.create({ guildID: constantsFile.mainServerID, xp: randomNumber, memberID: message.author.id, level: 0 });
  }
}

module.exports = { xp };
