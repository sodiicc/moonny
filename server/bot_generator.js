function bot_generator(lvl, diff, attacker_nickname, nickname) {
  let rand = () => Math.random()

  let stats = lvl * (8 + diff)
  let items = 1 + diff
  let rarity = diff

  // diff >= 4 = boss

  if (diff > 3) {
    stats = Math.round((stats * 1.5 * lvl) / 4)
    items = 5
    rarity = diff - 4
  }

  let bot = {
    hp: 50,
    current_hp: 50,
    lvl,
    str: 7,
    vit: 7,
    dex: 7,
    acc: 7,
    dmg: 30,
    date: Date.now(),
    attacker_nickname,
    nickname,
    diff,
    // items: [],
  }

  //   for (let i = items; i > 0; i--) {
  //     bot.items.push(getItem(lvl, rarity));
  //   }

  for (let i = stats; i > 0; i--) {
    let res = Math.floor(rand() * 6)
    switch (res) {
      case 0:
        bot.vit += 1
        break
      case 1:
        bot.str += 1
        break
      case 2:
        bot.dex += 1
        break
      case 3:
        bot.acc += 1
        break
      default: 
        bot.vit  += 1
    }
  }
  bot.hp = bot.current_hp = bot.hp + 4 * bot.vit

  return bot
}

exports.bot = bot_generator
