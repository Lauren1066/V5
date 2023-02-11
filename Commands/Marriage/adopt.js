const { SlashCommandBuilder } = require("discord.js");
const parentModel = require("../../Model/Family/parents.js");
const marriageModel = require("../../Model/Family/marriages.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("adopt")
    .setDescription("Adopt a user.")
    .addUserOption((option) => option.setName("user").setDescription("The user to adopt").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const data = await parentModel.findOne({ parentID: interaction.user.id });
    const pendingAdoptionData = await parentModel.findOne({ "children.childID": user.id });
    const marriageData = await marriageModel.findOne({ "users.userOne": user.id, "users.userTwo": interaction.user.id });
    const marriageDataTwo = await marriageModel.findOne({ "users.userOne": interaction.user.id, "users.userTwo": user.id });

    if (marriageData || marriageDataTwo) {
      interaction.reply("This ain't Alabama 👀");
    } else if (pendingAdoptionData) {
      interaction.reply("That user already has an adoption request!");
    } else if (data) {
      data.children.push({ childID: user.id, accepted: false });
      data.save();
      interaction.reply(`<@${user.id}>, <@${interaction.user.id}> would like to adopt you! Use /decideadopt to accept/deny.`);
    } else if (!data) {
      const newData = new parentModel({ children: [{ childID: user.id, accepted: false }], parentID: interaction.user.id });
      newData.save();
      interaction.reply(`<@${user.id}>, <@${interaction.user.id}> would like to adopt you! Use /decideadopt to accept/deny.`);
    } else {
      interaction.reply("Something went wrong!");
    }
  },
};
