const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const rep = require("../../Model/repBalance.js");
const repCooldown = require("../../Model/Cooldowns/repCooldown");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rep")
    .setDescription("Rep a user.")
    .addUserOption((option) => option.setName("target").setDescription("The user to rep").setRequired(true)),
  async execute(interaction) {
    const member = interaction.options.getUser("target");
    let data = await rep.findOne({
      memberID: member.id,
    });
    let usedData = await repCooldown.findOne({
      guildID: interaction.guild.id,
      memberID: interaction.user.id,
    });

    if (interaction.member.roles.cache.has("1040834838690795560")) {
      if (data) {
        // Update data
        data.repAmount++;
        data.save();

        // Send embed
        const embed = new EmbedBuilder()
          .setTitle(`${member.tag} has gained 1 rep point!`)
          .setColor("#8ef1ec")
          .addFields({ name: "Current Rep Amount:", value: `${data.repAmount}` }, { name: "Rep Added By:", value: interaction.user.username });
        interaction.reply({
          embeds: [embed],
        });
      } else if (!data) {
        // New Data
        let newData = new rep({
          memberID: member.id,
          repAmount: 1,
        });
        newData.save();

        // Send Embed
        const embed = new EmbedBuilder()
          .setTitle(`${member.tag} has gained 1 rep point!`)
          .setColor("#8ef1ec")
          .addFields({ name: "Current Rep Amount:", value: `1` }, { name: "Rep Added By:", value: interaction.user.username });
        interaction.reply({
          embeds: [embed],
        });
      }
    } else if (member.id != interaction.user.id) {
      if (data && usedData) {
        const canWork = usedData.lastUsed;
        let x = Date.now();

        const result = x - canWork;
        if (result >= 2700000) {
          // Update Data
          data.repAmount++;
          data.save();

          // Update Cooldown
          usedData.lastUsed = new Date();
          usedData.save();

          // Send Embed
          const embed = new EmbedBuilder()
            .setTitle(`${member.tag} has gained 1 rep point!`)
            .setColor("#8ef1ec")
            .addFields({ name: "Current Rep Amount:", value: `${data.repAmount}` }, { name: "Rep Added By:", value: interaction.user.username });
          interaction.reply({
            embeds: [embed],
          });
        } else {
          interaction.reply("The cooldown for this command is not up yet");
        }
      } else if (!data && usedData) {
        const canWork = usedData.lastUsed;
        let x = Date.now();

        const result = x - canWork;
        if (result >= 2700000) {
          // New Rep
          let newData = new rep({
            memberID: member.id,
            repAmount: 1,
          });
          newData.save();

          // Update Cooldown
          usedData.lastUsed = new Date();
          usedData.save();

          // Send Embed
          const embed = new EmbedBuilder()
            .setTitle(`${member.tag} has gained 1 rep point!`)
            .setColor("#8ef1ec")
            .addFields({ name: "Current Rep Amount:", value: `1` }, { name: "Rep Added By:", value: interaction.user.username });
          interaction.reply({
            embeds: [embed],
          });
        } else {
          interaction.reply("The cooldown for this command is not up yet");
        }
      } else if (data && !usedData) {
        // Update Data
        data.repAmount++;
        data.save();

        // Make new cooldown
        let newCooldown = new repCooldown({
          guildID: interaction.guild.id,
          memberID: interaction.user.id,
          lastUsed: Date.now(),
        });
        newCooldown.save();

        // Send Embed
        const embed = new EmbedBuilder()
          .setTitle(`${member.tag} has gained 1 rep point!`)
          .setColor("#8ef1ec")
          .addFields({ name: "Current Rep Amount:", value: `${data.repAmount}` }, { name: "Rep Added By:", value: interaction.user.username });
        interaction.reply({
          embeds: [embed],
        });
      } else if (!data && !usedData) {
        // New Rep
        let newData = new rep({
          memberID: member.id,
          repAmount: 1,
        });
        newData.save();

        // New cooldown
        let newCooldown = new repCooldown({
          guildID: interaction.guild.id,
          memberID: interaction.user.id,
          lastUsed: Date.now(),
        });
        newCooldown.save();

        // Send Embed
        const embed = new EmbedBuilder()
          .setTitle(`${member.tag} has gained 1 rep point!`)
          .setColor("#8ef1ec")
          .addFields({ name: "Current Rep Amount:", value: `1` }, { name: "Rep Added By:", value: interaction.user.username });
        interaction.reply({
          embeds: [embed],
        });
      }
    } else {
      interaction.reply("You can't rep yourself");
    }
  },
};
