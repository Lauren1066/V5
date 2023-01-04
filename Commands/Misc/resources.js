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
          { name: "Australia", value: "Australia" },
          { name: "Canada", value: "Canada" },
          { name: "India", value: "India" },
          { name: "New Zealand", value: "NZ" },
          { name: "Portugal", value: "Portugal" },
          { name: "Romania", value: "Romania" },
          { name: "United Kingdom", value: "UK" },
          { name: "USA", value: "USA" },
          { name: "Other", value: "Other" }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const country = interaction.options.getString("country");
    if (country == "USA") {
      const embed = new EmbedBuilder()
        .setTitle("USA helplines")
        .setDescription(
          `If you are in immediate danger please call 911 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
        [apa.org](https://www.apa.org/topics/crisis-hotlines)
        [pleaselive.org](https://www.pleaselive.org/hotlines/)
        [samhsa.gov](https://www.samhsa.gov/find-help/national-helpline)`
        )
        .setFooter({ text: "Special thanks to ネGoldenネ#8782 for assistance with links" });
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
      const embed = new EmbedBuilder()
        .setTitle("United Kingdom helplines")
        .setDescription(
          `If you are in immediate danger please call 999 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
        [therapyroute.com](https://www.therapyroute.com/article/suicide-hotlines-and-crisis-lines-in-the-united-kingdom)
        [nhs.uk](https://www.nhs.uk//)`
        )
        .setFooter({ text: "Special thanks to ネGoldenネ#8782 for assistance with links" });
      interaction.reply({ embeds: [embed] });
    } else if (country == "Canada") {
      const embed = new EmbedBuilder()
        .setTitle("Canada helplines")
        .setDescription(
          `If you are in immediate danger please call 911 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
       [camh.ca](https://www.camh.ca/)
       [canada.ca](https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html)`
        )
        .setFooter({ text: "Special thanks to ネGoldenネ#8782 for assistance with links" });
      interaction.reply({ embeds: [embed] });
    } else if (country == "India") {
      const embed = new EmbedBuilder().setTitle("India helplines").setDescription(
        `If you are in immediate danger please call 112 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
        [blog.opencounseling.com](https://blog.opencounseling.com/hotlines-in/)
        [indianhelpline.com](https://indianhelpline.com/)
        [aasra.info](http://www.aasra.info/helpline.html)`
      );
      interaction.reply({ embeds: [embed] });
    } else if (country == "Australia") {
      const embed = new EmbedBuilder()
        .setTitle("Australia helplines")
        .setDescription(
          `If you are in immediate danger please call 000 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
        [health.nsw.gov.au](https://www.health.nsw.gov.au/mentalhealth/services/Pages/support-contact-list.aspx)`
        )
        .setFooter({ text: "Special thanks to ネGoldenネ#8782 for assistance with links" });
      interaction.reply({ embeds: [embed] });
    } else if (country == "NZ") {
      const embed = new EmbedBuilder()
        .setTitle("New Zealand helplines")
        .setDescription(
          `If you are in immediate danger please call 111 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
        [mentalhealth.org.nz](https://mentalhealth.org.nz/helplines)
        [lifeline.org.nz](https://www.lifeline.org.nz/)`
        )
        .setFooter({ text: "Special thanks to ネGoldenネ#8782 for assistance with links" });
      interaction.reply({ embeds: [embed] });
    } else if (country == "Romania") {
      const embed = new EmbedBuilder()
        .setTitle("Romania helplines")
        .setDescription(
          `If you are in immediate danger please call 112 instead of using a helpline. 
        The After Hours staff team takes mental health very seriously and if you need someone to talk to, please reach out. 
        A list of hotlines is available below as well.
        [mentalhealthforromania.org](https://mentalhealthforromania.org/en/home/)
        [antisuicid.ro](https://www.antisuicid.ro/)`
        )
        .setFooter({ text: "Special thanks to ネGoldenネ#8782 for assistance with links" });
      interaction.reply({ embeds: [embed] });
    } else if (country == "Other") {
      interaction.reply(
        "It seems we do not have hotlines for your country yet. Please reach out to a staff member who will help you find someone to talk with. If this is an emergency please call your local emergency services"
      );
    }
  },
};
