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
    const xpNeeded = 5 * Math.pow(levelData.level, 2) + 60 * levelData.level + 100;
    levelData.xp += randomNumber;

    if (xpNeeded <= levelData.xp) {
      levelData.level++;
      levelData.xp -= xpNeeded;

      if (backgroundData) {
        try {
          backgroundCard(levelData, backgroundData, message.author, expModel, message);
        } catch (error) {
          message.channel.send("Your background card doesn't seem to be working!");
          card(levelData, message.author, expModel, message);
          console.error(error);
        }
      } else {
        card(levelData, message.author, expModel, message);
      }

      checkLevel(levelData.level, guild, message.member);
    }
    await levelData.save();
  } else {
    expModel.create({ guildID: constantsFile.mainServerID, xp: randomNumber, memberID: message.author.id, level: 0 });
  }
}

module.exports = { xp };
