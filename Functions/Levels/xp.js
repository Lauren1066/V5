// Require everything
const rn = require("random-number");
const expModel = require("../../Model/exp.js");
const constantsfile = require("../../Storage/constants.js");
const backgroundModel = require("../../Model/backgrounds.js");
const { checkLevel } = require("./checkLevel.js");
const { card } = require("./RankCards/card.js");
const { backgroundCard } = require("./RankCards/backgroundCard.js");

// Start the function
async function xp(message) {
  // Find the data
  let levelData = await expModel.findOne({
    guildID: constantsfile.mainServerID,
    memberID: message.author.id,
  });

  let backgroundData = await backgroundModel.findOne({ memberID: message.author.id });

  // Get the random XP amount
  var options = {
    min: constantsfile.minXP,
    max: constantsfile.maxXp,
    integer: true,
  };
  const randomNumber = rn(options);

  // Get the main server
  const guild = await message.client.guilds.fetch(constantsfile.mainServerID);

  if (levelData && backgroundData) {
    // Add to their xp and set it equal to their xp
    x = levelData.xp + randomNumber;
    levelData.xp = x;

    // Get their info
    var level = levelData.level;
    var xp = levelData.xp;
    var xpNeeded = 5 * Math.pow(levelData.level, 2) + 60 * levelData.level + 100;

    // If they're gonna level up
    if (xpNeeded < xp) {
      // They level up
      z = level + 1;
      levelData.level = z;

      // Find new xp value
      y = levelData.xp - xpNeeded;
      levelData.xp = y;

      // Try to use their background
      try {
        backgroundCard(levelData, backgroundData, message.author, expModel, message);
        // If it doesn't work
      } catch (error) {
        console.log(error);
        card(levelData, message.author, expModel, message);
        message.channel.send("Your custom card does not seem to be working!");
      }
      // See if they need roles added
      checkLevel(z, guild, message.member);
    }
    // Save the updated data
    levelData.save();
  } else if (!levelData && backgroundData) {
    // Add them to the database and save
    let newExp = new expModel({
      guildID: constantsfile.mainServerID,
      xp: randomNumber,
      memberID: message.author.id,
      level: 0,
    });
    newExp.save();
    // Try to use their background
    try {
      backgroundCard(levelData, backgroundData, message.author, expModel, message);
      // If it doesn't work
    } catch (error) {
      console.log(error);
      card(levelData, message.author, expModel, message);
      message.channel.send("Your custom card does not seem to be working!");
    }
  } else if (levelData && !backgroundData) {
    // Add to their xp and set it equal to their xp
    x = levelData.xp + randomNumber;
    levelData.xp = x;

    // Get their info
    var level = levelData.level;
    var xp = levelData.xp;
    var xpNeeded = 5 * Math.pow(levelData.level, 2) + 60 * levelData.level + 100;

    // If they're gonna level up
    if (xpNeeded < xp) {
      // They level up
      z = level + 1;
      levelData.level = z;

      // Find new xp value
      y = levelData.xp - xpNeeded;
      levelData.xp = y;

      // Send their card (no background)
      card(levelData, message.author, expModel, message);

      // See if they need roles added
      checkLevel(z, guild, message.member);
    }
    // Save all updated data
    levelData.save();
  } else if (!levelData && !backgroundData) {
    // Add them to  the database and save
    let newExp = new expModel({
      guildID: constantsfile.mainServerID,
      xp: randomNumber,
      memberID: message.author.id,
      level: 0,
    });
    newExp.save();

    // Send their card (no background)
    card(levelData, message.author, expModel, message);
  }
}

module.exports = { xp };
