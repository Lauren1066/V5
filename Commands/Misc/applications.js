const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("applications").setDescription("Get links to apply for staff."),
  async execute(interaction) {
    let embed = new EmbedBuilder()
      .setTitle("Want to help out?")
      .addFields(
        { name: "Moderation Team:", value: "https://forms.gle/AmNACLRMTuNS66wd8" },
        { name: "Tutor Application:", value: "https://forms.gle/SgfKBhv96J2aw2P58" },
        { name: "Event Managers:", value: "https://forms.gle/5dcAQ6HufnLBymKq5" }
      )
      .setColor("#8ef1ec");
    return interaction.reply({ embeds: [embed] });
  },
};
