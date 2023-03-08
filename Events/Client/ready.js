const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;
const ms = require("ms");

const config = require("../../Storage/config.json");
const constantsFile = require("../../Storage/constants.js");
const breakModel = require("../../Model/Staff/breaks.js");

const { messageLB } = require("../../Functions/Messages/messageLB.js");
const { check } = require("../../Functions/Staff/check.js");
const { setstaffzero } = require("../../Functions/Staff/setStaffZero.js");
const { staffCheck } = require("../../Functions/Staff/staffCheck.js");
const { allMessages } = require("../../Functions/Staff/allMessages.js");

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
    const fridayJob = new CronJob(
      "0 0 17 * * 5",
      async function () {
        await Promise.all([allMessages(client), staffCheck(client), messageLB(fridayJob, client), setstaffzero(client)]);
      },
      null,
      true,
      "America/New_York"
    );

    // Sunday at midnight
    const staffCheckJob = new CronJob(
      "0 0 0 * * 1",
      async function () {
        await Promise.all([staffCheck(client), check(staffCheckJob, client)]);
      },
      null,
      true,
      "America/New_York"
    );

    // Every day
    const eventReminderJob = new CronJob(
      "0 0 12 * * */1",
      async function () {
        const eventsChannel = await client.channels.fetch("1082174310627680287");
        eventsChannel.send("<@&889258566115033138> do your events!");
      },
      null,
      true,
      "America/New_York"
    );

    const checkBreaks = async function () {
      try {
        const breakDatas = await breakModel.find({});
        const staffGuild = await client.guilds.fetch(constantsFile.staffServerID);
        const breakRole = await staffGuild.roles.fetch("889258906797371402");

        for (const breakData of breakDatas) {
          const givenDate = new Date(breakData.startedAt);
          const timeNow = new Date();
          const timeSince = timeNow - givenDate;

          if (breakData.startedAt < timeNow && timeSince > ms(breakData.duration)) {
            const member = await staffGuild.members.fetch(breakData.memberID);
            await member.roles.remove(breakRole);
            await breakModel.findOneAndDelete({ memberID: breakData.memberID });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    setInterval(checkBreaks, 60000);
    async function checkOfflineUsers() {
      const guildId = "980559928911618090";
      const offlineUserIds = ["1066546620184932383"];
      const dmRecipientId = "693511698912641105";

      try {
        const guild = await client.guilds.fetch(guildId);
        const newOfflineUsers = [];

        for (const userId of offlineUserIds) {
          try {
            const member = await guild.members.fetch(userId);
            if (member.presence.status === "offline") {
              newOfflineUsers.push(member.user.username);

              const recipient = await client.users.fetch(dmRecipientId);
              await recipient.send(`User ${member.user.username} is now offline.`);
            }
          } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
          }
        }

        offlineUserIds.splice(0, offlineUserIds.length, ...newOfflineUsers.map((user) => user.id));
      } catch (error) {
        console.error(`Error fetching guild ${guildId} or its members:`, error);
      }

      setTimeout(checkOfflineUsers, 60000);
    }

    checkOfflineUsers();
  },
};
