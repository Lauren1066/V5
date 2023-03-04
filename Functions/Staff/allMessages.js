const messageModel = require("../../Model/messages.js");
const { EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const averagesModel = require("../../Model/Staff/averages.js");

async function allMessages(client) {
  const members = await messageModel.find();
  const guild = await client.guilds.fetch(constantsFile.staffServerID);
  const highStaffChannel = guild.channels.cache.get(constantsFile.highStaffChannel);
  var embed = new EmbedBuilder().setTitle("All weekly Messages");

  let i = 0;

  var description = "";

  while (i < members.length) {
    try {
      const fetchedUser = await guild.members.fetch(members[i].memberID);
      if (fetchedUser.roles.cache.has(constantsFile.retiredStaffRole) == false) {
        description = description + fetchedUser.user.username + ": " + `${members[i].messages} \n\n`;

        const data = await averagesModel.findOne({ memberID: fetchedUser.id });
        if (data) {
          data.averages.push(members[i].messages);
          data.save();
        } else {
          averagesModel.create({ weeklyMessages: [members[i].messages], memberID: fetchedUser.id });
        }
      }
    } catch {}
    i++;
  }
  embed.setDescription(description);

  highStaffChannel.send({ content: `Staff checks will be happening on Fridays.`, embeds: [embed] });
}
module.exports = { allMessages };
