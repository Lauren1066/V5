const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js");
const helperRoles = require("../../Model/helperRoles.js");
const helperCooldown = require("../../Model/Cooldowns/helperPing.js");
const constantsFile = require("../../Storage/constants.js");
const constants = require("../../Storage/constants.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("helper")
    .setDescription("Ping a helper role.")
    .addStringOption((option) =>
      option
        .setName("subject")
        .setDescription("The subject you need help in")
        .setRequired(true)
        .addChoices(
          { name: "Math", value: "Math" },
          { name: "Science", value: "Science" },
          { name: "English", value: "English" },
          { name: "History", value: "History" },
          { name: "Spanish", value: "Spanish" },
          { name: "French", value: "French" },
          { name: "Mandarin", value: "Mandarin" },
          { name: "Programming", value: "Programming" },
          { name: "Technology", value: "Technology" },
          { name: "Public Speaking", value: "Public" }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.member.roles.add(constants.canReadRole);

    const helperRoleName = interaction.options.getString("subject");
    const role = await helperRoles.findOne({
      roleName: helperRoleName,
    });

    const usedData = await helperCooldown.findOne({
      guildID: interaction.guild.id,
      memberID: interaction.user.id,
    });
    // Check channel first
    if (interaction.channel.type == 0 && interaction.channel.parentId == constants.academicCategory) {
      if (interaction.member.roles.cache.has(constantsFile.noCooldownRole)) {
        await interaction.channel.send(`<@&${role.roleID}>`);
        await interaction.editReply(`<@${interaction.user.id}> needs help\nBe sure to send your question!`);
      } else if (usedData) {
        const regularCooldown = 1800000;
        let time = usedData.lastUsed;
        let x = Date.now();
        const timeSince = x - time;
        if (timeSince < regularCooldown) {
          interaction.editReply("This command has a 30 minute cooldown that is not up yet!").then(interaction.deleteReply());
        } else {
          usedData.lastUsed = new Date();
          usedData.save();
          await interaction.channel.send(`<@&${role.roleID}>`);
          await interaction.editReply(`<@${interaction.user.id}> needs help\nBe sure to send your question!`);
        }
      } else if (!usedData) {
        let newCooldown = new helperCooldown({
          guildID: interaction.guild.id,
          memberID: interaction.user.id,
          lastUsed: Date.now(),
        });
        newCooldown.save();
        await interaction.channel.send(`<@&${role.roleID}>`);
        await interaction.editReply(`<@${interaction.user.id}> needs help\nBe sure to send your question!`);
      }
    } else {
      interaction.editReply(`This must be used in an academic text channel! Be sure to read <#${constantsFile.getHelpChannel}>`);
    }
  },
};
