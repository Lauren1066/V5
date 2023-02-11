const { ActivityType } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const mongoose = require("mongoose");
const { messageLB } = require("../../Functions/Messages/messageLB.js");
const { check } = require("../../Functions/Staff/check.js");
const { setstaffzero } = require("../../Functions/Staff/setStaffZero.js");
const { staffCheck } = require("../../Functions/Staff/staffCheck.js");
const CronJob = require("cron").CronJob;
const breakModel = require("../../Model/breaks.js");
const ms = require("ms");
const config = require("../../Storage/config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Log to terminal that bot has logged in
    console.log(`Logged in as ${client.user.tag}!`);

    // Get channel and send a message saying the bot has started
    const timeStarted = Math.floor(new Date().getTime() / 1000);
    client.channels.fetch(constantsFile.statusChannel).then((channel) => {
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
    await mongoose.connect(config.mongoosePath, {
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

    const checkBreaks = async function CheckBreaks() {
      breakModel.find({}).exec((err, res) => {
        i = 1;
        res.forEach(async (breakData) => {
          const parsedDuration = ms(breakData.duration);
          const timeSince = breakData.startedAt - parsedDuration;
          if (timeSince > 0) {
            const staffGuild = await client.guilds.fetch(constantsFile.staffServerID);
            const breakRole = await staffGuild.roles.fetch("889258906797371402");
            const member = await staffGuild.members.fetch(breakData.memberID);
            await member.roles.remove(breakRole);
          }
        });
      });
    };

    setInterval(checkBreaks, 60000);
  },
};
