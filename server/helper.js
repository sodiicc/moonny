const { bonus_for_sets } = require("./dictionary")

const getCharacterData = (char = {}, items = []) => {
  const charData = getCharWithItemsBonuses(char, items.filter(el => el.is_weared))
  charData.items = []

  if (items.length) {
    items.forEach(item => {
      const formated_item = {
        id: item.id,
        url: item.url,
        type: item.type,
        name: item.name,
        set_name: item.set_name,
        lvl: item.lvl,
        rar: item.rar,
        is_weared: item.is_weared,
        main_bonus: {
          hp: item.hp,
          str: item.str,
          dex: item.dex,
          vit: item.vit,
          acc: item.acc,
          dmg: item.dmg,
          time: item.time,
        },
        set_bonus: bonus_for_sets[item.set_name]
      }

      for (const key in formated_item.main_bonus) {
        if (formated_item.main_bonus[key] === 0) {
          delete formated_item.main_bonus[key];
        }
      }

      charData.items.push(formated_item)
    })
  }
  return charData
}

function getCharWithItemsBonuses (char, wearedItems) {
  const charData = {...char}
  wearedItems.forEach(item => {
    charData.hp += (item.hp + item.vit * 4)
    charData.current_hp += (item.hp + item.vit * 4)
    charData.str += item.str
    charData.dex += item.dex
    charData.vit += item.vit
    charData.acc += item.acc
    charData.dmg += item.dmg
    charData.time += item.time
  })

  return charData
}


exports.getCharacterData = getCharacterData