const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("end").setDescription("Send this after you finish helping someone!"),
  async execute(interaction) {
    await interaction.deferReply();

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
          name: "If you felt your helper did a good job consider doing /rep <user> and leave a /review",
          value: "If you did not find your helper helpful we are very sorry to hear that! If you feel the need, let the owner know!",
        },
        {
          name: "To the next person who needs help:",
          value: "To ping a helper please do /helper. Then select the subject you need from in the menu.",
        }
      );
    interaction.editReply({
      content: "``` ```",
      embeds: [embed],
    });

    const helpChannel = await interaction.client.channels.fetch("1040792832832716800");
    const openMessageID = "1081296676666486824";
    const closedMessageID = "1081296678243536956";
    const channelMention = `<#${interaction.channel.id}>`;
    const openMessage = await helpChannel.messages.fetch(openMessageID);
    const closedMessage = await helpChannel.messages.fetch(closedMessageID);

    if (!openMessage.content.includes(channelMention)) {
      const updatedOpenMessage = openMessage.content + `\n${channelMention}`;
      openMessage.edit(updatedOpenMessage);
    }

    if (closedMessage.content.includes(channelMention)) {
      const updatedClosedMessage = closedMessage.content.replace(`\n${channelMention}`, "");
      closedMessage.edit(updatedClosedMessage);
    }
  },
};
