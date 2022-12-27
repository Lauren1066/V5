function loadCommands(client) {
  const fs = require("fs");
  const path = require("node:path");

  const commandsPath = path.join(__dirname, "../Commands");
  const commandsFolder = fs.readdirSync("./Commands");
  for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);
      const filePath = path.join(commandsPath, folder, file);
      const command = require(filePath);

      client.commands.set(commandFile.data.name, command);
    }
  }
}

module.exports = { loadCommands };
