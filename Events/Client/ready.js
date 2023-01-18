const { ActivityType } = require("discord.js");
const constantFile = require("../../Storage/constants.js");
const mongoose = require("mongoose");
const { messageLB } = require("../../Functions/messageLB.js");
const { check } = require("../../Functions/check.js");
const { setstaffzero } = require("../../Functions/setStaffZero.js");
const { staffCheck } = require("../../Functions/staffCheck.js");
const CronJob = require("cron").CronJob;
const TwitchAPI = require("node-twitch").default;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Log to terminal that bot has logged in
    console.log(`Logged in as ${client.user.tag}!`);

    // Get channel and send a message saying the bot has started
    const timeStarted = Math.floor(new Date().getTime() / 1000);
    client.channels.fetch(constantFile.statusChannel).then((channel) => {
      channel.send(`Bot Started at <t:${timeStarted}>`);
    });

    // Set the bot's status
    client.user.setPresence({
      activities: [{ name: `Discord Users 👀!`, type: ActivityType.Watching }],
      status: "online",
    });

    // If the field doesn't exist it won't be added to the schema (I think)
    // It was true by default but won't be in the next update (as of Dec 7th, 2022).
    mongoose.set("strictQuery", true);

    // Connect to mongoose
    await mongoose.connect(constantFile.mongoosePath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Friday at 5 (Clear Day)
    var job = new CronJob(
      "0 0 17 * * 5",
      async function () {
        // Send a list of users who have less than 25 messages to the high staff channel
        await staffCheck(client);
        // Send the top messenger in main server, then clear messages
        await messageLB(job, client);
        // Set all staff members to 0 messages (so they will show up when doing /forcestaffcheck)
        await setstaffzero(client);
      },
      null,
      true,
      "America/New_York"
    );

    // Sunday at midnight
    var staffCheckJob = new CronJob(
      "0 0 0 * * 1",
      async function () {
        // Send a list of users who have less than 25 messages to the high staff channel
        await staffCheck(client);
        // Same thing but in announcements channel
        check(staffCheckJob, client);
      },
      null,
      true,
      "America/New_York"
    );

    // Set up Twitch
    const twitch = new TwitchAPI({
      client_id: config.twitch.AppClientID,
      client_secret: config.twitch.AppSecretToken,
    });
  },
};
