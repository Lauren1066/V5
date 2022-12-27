function loadEvents(client) {
  const fs = require("fs");
  const path = require("node:path");

  const eventsPath = path.join(__dirname, "../Events");
  const folders = fs.readdirSync("./Events");

  for (const folder of folders) {
    const files = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const filePath = path.join(eventsPath, folder, file);
      const event = require(filePath);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
}

module.exports = { loadEvents };
