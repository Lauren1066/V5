const ids = {
  // User IDs
  clientID: "1012220507434786817",
  ownerID: "693511698912641105",

  // Server IDs
  mainServerID: "1040773239607140485",
  staffServerID: "888922290371330058",
  testServerID: "980559928911618090",

  // Channel IDs
  eventChannelID: "1040841716086874133",
  statusChannel: "1073861685682638890",
  mainGeneralChat: "1040773240135626764",
  getHelpChannel: "1040792832832716800",
  staffLBChannel: "913664976181403698",
  mainLBChannel: "1040841716086874133",
  staffBotChannel: "888923331489845278",
  mainBotChannel: "1040786220487286825",
  highStaffChannel: "1054150224387526746",
  punishmentChannel: "1040794645883539516",
  breakRequestChannel: "1067626214623293551",
  breakLogsChannel: "1067633573215076392",
  applicationLogChannel: "913671047847485470",

  // Category IDs
  academicCategory: "1040785886264172564",
};

const roles = {
  // Ping Roles
  deadChatRole: "1040837069834043442",
  eventPingRole: "1040837359933063289",
  giveawayPingRole: "1040838322890752034",
  journalPingRole: "1040838589031911486",
  questionPingRole: "1040839413242003466",
  wordPingRole: "1040841007580856420",
  memePingRole: "1063667481006321664",
  announcementPings: "1046503072500813914",
  factPingRole: "1070973110553169960",
  applicationPingRole: "889269957882437692",

  // Misc Roles
  noCooldownRole: "1040834838690795560",
  retiredStaffRole: "1046652860600942654",
  mainStaffrole: "1040788165440577606",
  canReadRole: "1064701602688159804",

  // Level Roles
  levelonerole: "1040830062133530676",
  levelfiverole: "1040830087307731005",
  leveltenrole: "1040830091191652362",
  leveltwentyrole: "1040830095243358340",
  levelthirtyrole: "1040830099290857512",
  levelfortyrole: "1040854023034634242",
  levelfiftyrole: "1040830102814081065",
};

// XP parameters
const xp = {
  minXP: 8,
  maxXp: 12,
};

module.exports = {
  ...ids,
  ...roles,
  ...xp,
};
