const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("review")
    .setDescription("Review your helper.")
    .addUserOption((option) => option.setName("user").setDescription("The user to review").setRequired(true))
    .addIntegerOption((option) =>
      option
        .setName("stars")
        .setDescription("The rating from 0-5")
        .setRequired(true)
        .addChoices(
          { name: "0", value: 0 },
          { name: "1", value: 1 },
          { name: "2", value: 2 },
          { name: "3", value: 3 },
          { name: "4", value: 4 },
          { name: "5", value: 5 }
        )
    )

    .addStringOption((option) => option.setName("review").setDescription("Explain your review").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const stars = interaction.options.getInteger("stars");
    const review = interaction.options.getString("review");
    const guild = await interaction.client.guilds.fetch(constantsFile.mainServerID);
    const channel = await guild.channels.fetch("1083143120226635826");

    if (stars < 0 || stars > 5) {
      return interaction.reply({ content: "Must be between 0-5 stars!", ephemeral: true });
    }

    const embed = new EmbedBuilder().setTitle(`${user.username}'s review`).addField("Stars", stars, true).addField("Review", review, true);

    await channel.send({ embeds: [embed] });

    return interaction.reply({ content: "Review submitted!", ephemeral: true });
  },
};
