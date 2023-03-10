const { SlashCommandBuilder } = require("discord.js");
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
          { name: "Public Speaking", value: "Public" },
          { name: "Music", value: "Music" }
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
          const helpChannel = await interaction.client.channels.fetch("1040792832832716800");
          const openMessageID = "1081296676666486824";
          const closedMessageID = "1081296678243536956";
          const channelMention = `<#${interaction.channel.id}>`;
          const openMessage = await helpChannel.messages.fetch(openMessageID);
          const closedMessage = await helpChannel.messages.fetch(closedMessageID);

          if (!closedMessage.content.includes(channelMention)) {
            const updatedOpenMessage = `${closedMessage.content} \n${channelMention}`;
            closedMessage.edit(updatedOpenMessage);
          }

          if (openMessage.content.includes(channelMention)) {
            const updatedClosedMessage = openMessage.content.replace(`\n${channelMention}`, "");
            openMessage.edit(updatedClosedMessage);
          }
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
        const helpChannel = await interaction.client.channels.fetch("1040792832832716800");
        const openMessageID = "1081296676666486824";
        const closedMessageID = "1081296678243536956";
        const channelMention = `<#${interaction.channel.id}>`;
        const openMessage = await helpChannel.messages.fetch(openMessageID);
        const closedMessage = await helpChannel.messages.fetch(closedMessageID);

        if (!closedMessage.content.includes(channelMention)) {
          const updatedOpenMessage = `${closedMessage.content} \n${channelMention}`;
          closedMessage.edit(updatedOpenMessage);
        }

        if (openMessage.content.includes(channelMention)) {
          const updatedClosedMessage = openMessage.content.replace(`\n${channelMention}`, "");
          openMessage.edit(updatedClosedMessage);
        }
      }
    } else {
      interaction.editReply(`This must be used in an academic text channel! Be sure to read <#${constantsFile.getHelpChannel}>`);
    }
  },
};
