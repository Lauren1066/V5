const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType, Embed, EmbedBuilder } = require("discord.js");
const constants = require("../../Storage/constants.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("resources")
    .setDescription("Find mental health resources in your country.")
    .addStringOption((option) =>
      option
        .setName("country")
        .setDescription("The subject you need help in")
        .setRequired(true)
        .addChoices(
          { name: "USA", value: "USA" },
          { name: "Portugal", value: "Portugal" },
          { name: "United Kingdom", value: "UK" },
          { name: "Other", value: "Other" }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const country = interaction.options.getString("country");
    if (country == "USA") {
      const embed = new EmbedBuilder().setTitle("USA helplines").setDescription(
        `If you are in immediate danger please call 911 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
        [apa.org](https://www.apa.org/topics/crisis-hotlines)
        [pleaselive.org](https://www.pleaselive.org/hotlines/)`
      );
      interaction.reply({ embeds: [embed] });
    } else if (country == "Portugal") {
      const embed = new EmbedBuilder()
        .setTitle("Portugal helplines")
        .setDescription(
          `If you are in immediate danger please call 112 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
       [eportugal.gov](https://eportugal.gov.pt/en/cidadaos-europeus-viajar-viver-e-fazer-negocios-em-portugal/cuidados-de-saude-em-portugal/contactos-de-emergencia-em-portugal)
       [therapyroute.com](https://www.therapyroute.com/article/suicide-hotlines-and-crisis-lines-in-portugal)`
        )
        .setFooter({ text: "Special thanks to =LLL=#0711 for the country information and assistance with links" });
      interaction.reply({ embeds: [embed] });
    } else if (country === "UK") {
      const embed = new EmbedBuilder().setTitle("United Kingdom helplines").setDescription(
        `If you are in immediate danger please call 999 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
        [therapyroute.com](https://www.therapyroute.com/article/suicide-hotlines-and-crisis-lines-in-the-united-kingdom)`
      );
      interaction.reply({ embeds: [embed] });
    } else if (country == "Other") {
      interaction.reply(
        "It seems we do not have hotlines for your country yet. Please reach out to a staff member who will help you find someone to talk with. If this is an emergency please call your local emergency services"
      );
    }
  },
};
