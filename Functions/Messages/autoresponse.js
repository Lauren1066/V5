async function autoresponse(message) {
  const constantsFile = require("../../Storage/constants.js");
  const permissions = message.channel.permissionsFor(message.client.user);
  const respondModel = require("../../Model/replies");
  const responses = await respondModel.find({});
  if (
    permissions.has("AttachFiles") &&
    permissions.has("SendMessages") &&
    permissions.has("EmbedLinks") &&
    message.channel.parentId != constantsFile.academicCategory &&
    message.guild.id != constantsFile.staffServerID
  ) {
    const ObjectArray = [];
    responses.forEach((response) => {
      ObjectArray.push(response);
    });
    var boolVar = false;
    ObjectArray.forEach((item) => {
      if (message.content.includes(item.trigger.toLowerCase()) && boolVar === false) {
        var someVar = ObjectArray[Math.floor(Math.random() * ObjectArray.length)];
        message.reply(someVar.reply);
        boolVar = true;
      }
    });
  }
}

module.exports = { autoresponse };
