module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldPresence, newPresence) {
    const userIdsToCheck = ["1012220507434786817", "1066546620184932383", "1051265925619392612"];

    const pingUserId = "693511698912641105";

    for (const userId of userIdsToCheck) {
      const user = client.users.cache.get(userId);
      if (user && oldPresence.status !== "offline" && newPresence.status === "offline") {
        // Ping the specified user
        const pingUser = client.users.cache.get(pingUserId);
        pingUser.send(`${user.username} is now offline!`);
      }
    }
  },
};
