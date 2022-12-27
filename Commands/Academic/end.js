const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("end").setDescription("Send this after you finish helping someone!"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        value: interaction.user.displayAvatarURL({
          dynamic: true,
        }),
      })
      .setColor("#8ef1ec")
      .setTimestamp()
      .setTitle("Done recieving help?")
      .setAuthor({
        name: `${interaction.user.username} - (${interaction.user.id})`,
        iconURL: interaction.guild.iconURL({ format: "png" }),
      })
      .addFields(
        {
          name: "If you felt your helper did a good job consider doing /rep <user>",
          value: "If you did not find your helper helpful we are very sorry to hear that! If you feel the need, let the owner know!",
        },
        {
          name: "To the next person who needs help:",
          value: "To ping a helper please do /helper. Then select the subject you need from in the menu.",
        }
      );
    interaction.reply({
      embeds: [embed],
    });
    interaction.channel.send("``` ```");
  },
};
