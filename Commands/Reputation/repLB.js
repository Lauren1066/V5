const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const rep = require("../../Model/repBalance");
const ordinal = (num) => `${num.toLocaleString("en-US")}${[, "st", "nd", "rd"][(num / 10) % 10 ^ 1 && num % 10] || "th"}`;
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder().setName("replb").setDescription("Check the rep leaderboard."),
  async execute(interaction, client) {
    const guild = client.guilds.cache.get(constantsFile.mainServerID);
    rep
      .find({})
      .sort([["repAmount", "descending"]])
      .then(async (res) => {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: "After Hours Reputation Leaderboard",
            iconURL: guild.iconURL({ extension: "png" }),
          })
          .setColor("#ee8a51");
        if (res.length === 0) {
          embed.setColor("#8ef1ec");
          embed.addFields({ value: "No results found!" });
        } else if (res.length < 10) {
          for (let i = 0; i < res.length; i++) {
            let name = await interaction.client.users.fetch(`${res[i].memberID}`).catch((err) => {
              console.log(err);
            });
            if (name == "User left") {
              embed.addFields({
                name: `${ordinal(i + 1)}. ${name}`,
                value: `**Rep:** ${res[i].repAmount}`,
              });
            } else {
              embed.addFields({
                name: `${ordinal(i + 1)}. ${name.username}`,
                value: `**Rep:** ${res[i].repAmount}`,
              });
            }
          }
        } else {
          for (let i = 0; i < 10; i++) {
            let name = await interaction.client.users.fetch(`${res[i].memberID}`).catch((err) => {
              console.log(err);
            });
            if (name == "User left") {
              embed.addFields({ name: `${i + 1}. ${name}`, value: `**Rep:** ${res[i].repAmount}` });
            } else {
              embed.addFields({
                name: `${i + 1}. ${name.username}`,
                value: `**Rep:** ${res[i].repAmount}`,
              });
            }
          }
        }
        interaction.reply({
          embeds: [embed],
        });
      });
  },
};
