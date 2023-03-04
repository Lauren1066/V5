const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const rep = require("../../Model/messages");
const ordinal = (num) => `${num.toLocaleString("en-US")}${[, "st", "nd", "rd"][(num / 10) % 10 ^ 1 && num % 10] || "th"}`;

module.exports = {
  data: new SlashCommandBuilder().setName("messagelb").setDescription("Check the message leaderboard."),
  async execute(interaction, client) {
    rep
      .find({})
      .sort([["messages", "descending"]])
      .then(async (res) => {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: "After Hours Messages Leaderboard",
            iconURL: client.user.displayAvatarURL(),
          })
          .setColor("#8ef1ec");
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
                value: `**Messages:** ${res[i].messages}`,
              });
            } else {
              embed.addFields({
                name: `${ordinal(i + 1)}. ${name.username}`,
                value: `**Messages:** ${res[i].messages}`,
              });
            }
          }
        } else {
          for (let i = 0; i < 10; i++) {
            let name = await interaction.client.users.fetch(`${res[i].memberID}`).catch((err) => {
              console.log(err);
            });
            if (name == "User left") {
              embed.addFields({ name: `${ordinal(i + 1)}. ${name}`, value: `**Messages:** ${res[i].messages}` });
            } else {
              embed.addFields({
                name: `${ordinal(i + 1)}. ${name.username}`,
                value: `**Messages:** ${res[i].messages}`,
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
