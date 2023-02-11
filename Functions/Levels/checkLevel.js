const constantsFile = require("../../Storage/constants.js");
async function checkLevel(level, guild, member) {
  console.log(level);
  if (level == 1) {
    let role = await guild.roles.fetch(constantsFile.levelonerole);
    console.log(`If this logs properly level one is working: ${role.name}`);
    member.roles.add(role);
  } else if (level == 5) {
    let role = await guild.roles.fetch(constantsFile.levelfiverole);
    console.log(`If this logs properly level five is working: ${role.name}`);
    member.roles.add(role);
  } else if (level == 10) {
    let role = await guild.roles.fetch(constantsFile.leveltenrole);
    console.log(`If this logs properly level ten is working: ${role.name}`);
    member.roles.add(role);
  } else if (level == 20) {
    let role = await guild.roles.fetch(constantsFile.leveltwentyrole);
    console.log(`If this logs properly level twenty is working: ${role.name}`);
    member.roles.add(role);
  } else if (level == 30) {
    let role = await guild.roles.fetch(constantsFile.levelthirtyrole);
    console.log(`If this logs properly level thirty is working: ${role.name}`);
    member.roles.add(role);
  } else if (level == 40) {
    let role = await guild.roles.fetch(constantsFile.levelfortyrole);
    console.log(`If this logs properly level fourty is working: ${role.name}`);
    member.roles.add(role);
  } else if (level == 50) {
    let role = await guild.roles.fetch(constantsFile.levelfiftyrole);
    console.log(`If this logs properly level fifty is working: ${role.name}`);
    member.roles.add(role);
  }
}
module.exports = { checkLevel };
