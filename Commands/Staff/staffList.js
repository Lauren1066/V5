const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
module.exports = {
  data: new SlashCommandBuilder().setName("stafflist").setDescription("See open positions"),
  async execute(interaction) {
    const guild = await interaction.client.guilds.fetch(constantsFile.staffServerID);
    const jrModRole = await guild.roles.fetch("889258147259252816");
    const modRole = await guild.roles.fetch("889258047317372948");
    const srModRole = await guild.roles.fetch("1050264802871746600");
    const adminRole = await guild.roles.fetch("889257914907373588");
    const srAdminRole = await guild.roles.fetch("1050264785171791913");

    const roles = [jrModRole, modRole, srModRole, adminRole, srAdminRole];
    const max = ["4", "3", "1", "4", "1"];

    const embed = new EmbedBuilder().setTitle("Moderation Team");

    i = 0;
    while (i < roles.length) {
      await embed.addFields({ name: roles[i].name, value: `${roles[i].members.size}/${max[i]}` });
      i++;
    }

    interaction.reply({ embeds: [embed] });
  },
};
