const applicationModel = require("../../Model/Staff/applications.js");
const constantsFile = require("../../Storage/constants.js");
const { EmbedBuilder } = require("discord.js");

async function eventmanagerApplication(message) {
  const applicationData = await applicationModel.findOne({
    memberID: message.author.id,
  });
  if (!applicationData) {
    const questionArray = [
      "Age? (Can be a range like 13-15 if you are not comfortable sharing)",
      "Timezone?",
      "Tell us about yourself!",
      "How many hours a week can you be available?",
      "Why do you want to join the After Hours events team?",
      "Are you a member of staff or event manager in any other servers right now? If so list the names and member count. If not, put N/A.",
      "Do you have any event organisation experience? Please explain in detail. If not, put N/A.",
      "In one message, and in as much detail as possible, please tell us what kind of event you would host when no prize is on offer.",
      "In one message, and in as much detail as possible, please tell us what kind of event you would host when a prize is on offer.",
    ];

    // change type to eventmanager
    const questionData = new applicationModel({
      questions: questionArray,
      answers: [],
      memberID: message.author.id,
      type: "events",
    });
    questionData.save();
    message.channel.send(questionArray[0]);
  } else if (applicationData && applicationData.answers.length === 0) {
    applicationData.answers.push(message.content);
    applicationData.save();
    message.channel.send(applicationData.questions[1]);
  } else if (applicationData && applicationData.answers.length > 0 && applicationData.answers.length < applicationData.questions.length - 1) {
    applicationData.answers.push(message.content);
    applicationData.save();
    message.channel.send(applicationData.questions[applicationData.answers.length]);
  } else if (applicationData.answers.length == applicationData.questions.length - 1) {
    applicationData.answers.push(message.content);
    applicationData.save();
    message.channel.send("Application done!");
    const guild = await message.client.guilds.fetch(constantsFile.staffServerID);
    const channel = await guild.channels.fetch(constantsFile.applicationLogChannel);
    const embed = new EmbedBuilder()
      // Change title
      .setTitle("There's a new Event Manager application!")
      .addFields({ name: "Discord Name:", value: message.author.tag }, { name: "Discord ID:", value: message.author.id });
    i = 0;
    while (i < applicationData.questions.length) {
      embed.addFields({
        name: applicationData.questions[i],
        value: applicationData.answers[i],
      });
      i++;
    }
    channel.send({
      content: `<@&${constantsFile.applicationPingRole}>`,
      embeds: [embed],
    });
  }
}
// Change export name to eventmanagerApplication
module.exports = { eventmanagerApplication };
