const { SlashCommandBuilder } = require("discord.js");
const marriageModel = require("../../Model/marriages.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("marry")
    .setDescription("Propose to a user.")
    .addUserOption((option) => option.setName("user").setDescription("The user to propose to").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const dataOne = await marriageModel.findOne({ "users.userOne": interaction.user.id });
    const dataTwo = await marriageModel.findOne({ "users.userTwo": interaction.user.id });
    const dataThree = await marriageModel.findOne({ "users.userOne": user.id });
    const dataFour = await marriageModel.findOne({ "users.userTwo": user.id });
    const proposalDate = new Date();
    if (!dataOne && !dataTwo && !dataThree && !dataFour && interaction.user.id != user.id) {
      const newData = new marriageModel({ users: [{ userOne: interaction.user.id, userTwo: user.id }], proposedAt: proposalDate, accepted: false });
      newData.save();
      interaction.reply(`You have proposed to <@${user.id}>! Now you must wait for them to accept/deny your proposal.`);
    } else if (dataOne) {
      interaction.reply("You already have proposed to someone else!");
    } else if (dataTwo) {
      interaction.reply("You already have a pending proposal!");
    } else if (dataThree) {
      interaction.reply("The user you proposed to has already proposed to someone else");
    } else if (dataFour) {
      interaction.reply("The user you proposed to already has a pending proposal");
    } else if (interaction.user.id === user.id) {
      interaction.reply("You can't marry yourself");
    }
  },
};
