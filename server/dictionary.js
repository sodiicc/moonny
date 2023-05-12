const bonus_for_sets = {
  wooden: [
    {
      dmg: 5,
      vit: 6,
    },
    {
      dmg: 15,
      vit: 18,
      str: 15,
    },
  ],
  iron: [
    {
      hp: 7,
      acc: 7,
      dmg: 6,
    },
    {
      dmg: 22,
      acc: 20,
      hp: 22,
      time: 5,
    },
  ],
  bronze: [
    {
      vit: 8,
      acc: 9,
      dex: 8,
      crit_chance: 8,
    },
    {
      vit: 25,
      acc: 23,
      dex: 26,
      crit_chance: 15,
      crit_power: 12,
    },
  ],
  silver: [
    {
      str: 12,
      vit: 13,
      dex: 12,
      acc: 14,
    },
    {
      str: 30,
      vit: 28,
      dex: 29,
      acc: 32,
      time: 15,
      crit_power: 22,
    },
  ],
  gold: [
    {
      str: 22,
      vit: 20,
      dex: 18,
      acc: 20,
    },
    {
      dmg: 30,
      str: 50,
      vit: 45,
      dex: 48,
      acc: 48,
      crit_chance: 30,
      crit_power: 35,
    },
  ],
  serafim: [
    {
      hp: 40,
      dmg: 35,
      str: 32,
      vit: 35,
      dex: 35,
      acc: 32,
      crit_chance: 50,
      crit_power: 50,
      time: 30,
    },
    {
      hp: 80,
      dmg: 75,
      str: 90,
      vit: 85,
      dex: 68,
      acc: 78,
      crit_chance: 90,
      crit_power: 120,
      time: 80,
    },
  ],
};

const item_schema = {
  url: "serafim_w",
  type: "weapon",
  name: "Pistol of Serafim",
  set_name: "serafim",
  lvl: 1,
  rar: 0,
  is_weared: false,
  main_bonus: {
    hp: 0,
    str: 0,
    dex: 0,
    vit: 0,
    acc: 0,
    dmg: 0,
    time: 0,
  },
  set_bonus: [],
};

const gradeItems = ["common", "uncommon", "magic", "rare", "epic", "legendary"];

const sets = [["wooden"], ["iron"], ["bronze"], ["silver"], ["gold"], ["serafim"]]

const item_types = ["weapon", "helm", "armor", "gloves", "boots"];

const drop_items_rarity_chances = [
  [10, 2, 0.5, 0.1, 0, 0],                           // for easy bot
  [18, 5, 2, 0.6, 0.15, 0],                          // for normal bot
  [35, 12, 6, 2, 0.7, 0.18],                         // for hard bot
  [85, 30, 16, 8, 3, 0.8],                           // for hell bot
  [300, 100, 45, 22, 12, 3],                         // for boss
  [1200, 400, 200, 80, 40, 12],                      // for raid boss
]

exports.bonus_for_sets = bonus_for_sets
exports.item_schema = item_schema
exports.gradeItems = gradeItems
exports.sets = sets
exports.item_types = item_types
exports.drop_items_rarity_chances = drop_items_rarity_chances