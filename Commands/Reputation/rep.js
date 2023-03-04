const { SlashCommandBuilder } = require("discord.js");
const rep = require("../../Model/repBalance.js");
const repCooldown = require("../../Model/Cooldowns/repCooldown");
const { sendRepEmbed } = require("./Functions/sendRepEmbed.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rep")
    .setDescription("Rep a user.")
    .addUserOption((option) => option.setName("target").setDescription("The user to rep").setRequired(true)),
  async execute(interaction) {
    const member = interaction.options.getUser("target");
    const isModerator = interaction.member.roles.cache.has("1040834838690795560");

    let data = await rep.findOne({
      memberID: member.id,
    });
    let usedData = await repCooldown.findOne({
      guildID: interaction.guild.id,
      memberID: interaction.user.id,
    });

    if (isModerator) {
      if (data) {
        // Update data
        data.repAmount++;
        data.save();

        // Send embed
        sendRepEmbed(interaction, member, data.repAmount);
      } else if (!data) {
        // New Data
        rep.create({ memberID: member.id, repAmount: 1 });

        // Send Embed
        sendRepEmbed(interaction, member, 1);
      }
    } else if (member.id != interaction.user.id) {
      if (data && usedData) {
        const canWork = usedData.lastUsed;

        const result = Date.now() - canWork;
        if (result >= 2700000) {
          // Update Data
          data.repAmount++;
          data.save();

          // Update Cooldown
          usedData.lastUsed = new Date();
          usedData.save();

          // Send Embed
          sendRepEmbed(interaction, member, data.repAmount);
        } else {
          interaction.reply("The cooldown for this command is not up yet");
        }
      } else if (!data && usedData) {
        const canWork = usedData.lastUsed;

        const result = Date.now() - canWork;
        if (result >= 2700000) {
          // New Rep
          rep.create({ memberID: member.id, repAmount: 1 });

          // Update Cooldown
          usedData.lastUsed = new Date();
          usedData.save();

          // Send Embed
          sendRepEmbed(interaction, member, 1);
        } else {
          interaction.reply("The cooldown for this command is not up yet");
        }
      } else if (data && !usedData) {
        // Update Data
        data.repAmount++;
        data.save();

        // Make new cooldown
        repCooldown.create({ guildID: interaction.guild.id, memberID: interaction.user.id, lastUsed: Date.now() });

        // Send Embed
        sendRepEmbed(interaction, member, data.repAmount);
        interaction.reply({
          embeds: [embed],
        });
      } else if (!data && !usedData) {
        // New Rep
        rep.create({ memberID: member.id, repAmount: 1 });

        // New cooldown
        repCooldown.create({ guildID: interaction.guild.id, memberID: interaction.user.id, lastUsed: Date.now() });

        // Send Embed
        sendRepEmbed(interaction, member, 1);
      }
    } else {
      interaction.reply("You can't rep yourself");
    }
  },
};
