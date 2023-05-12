const {item_types, item_schema, gradeItems, sets, bonus_for_sets, drop_items_rarity_chances} = require('./dictionary')


const getItem = (lvl, rar) => {
    let main_points = Math.round(
      (15 + 4 * lvl) * (1 + (rar * rar * rar) / (1 + 3 * rar))
    );
    
      let rand = () => Math.random();
    
      let defaultItem = JSON.parse(JSON.stringify(item_schema))

      let item_names = {
        weapon: "Pistol of",
        helm: "Helm of",
        armor: "Chest of",
        gloves: "Gloves of",
        boots: "Boots of",
      };
    
      defaultItem.rar = gradeItems[rar];
        
      defaultItem.type = item_types[Math.floor(rand() * item_types.length)];
      defaultItem.url = `${sets[rar]}_${defaultItem.type[0]}`;
      defaultItem.set_name = sets[rar][Math.floor(rand() * sets[rar].length)];
      defaultItem.name = `${item_names[defaultItem.type]} ${defaultItem.set_name}`;
      defaultItem.lvl = lvl
    
      for (let i = 0; i < main_points; i++) {
        let res = Math.floor(rand() * 7);
        switch (res) {
          case 0:
            defaultItem.main_bonus.hp += 8;
            break;
          case 1:
            defaultItem.main_bonus.str += 1;
            break;
          case 2:
            defaultItem.main_bonus.dex += 1;
            break;
          case 3:
            defaultItem.main_bonus.vit += 1;
            break;
          case 4:
            defaultItem.main_bonus.acc += 1;
            break;
          case 5:
            defaultItem.main_bonus.dmg += 2;
            break;
          default:
            defaultItem.main_bonus.time += 0.1;
        }
      }
    
      defaultItem.set_bonus = bonus_for_sets[defaultItem.set_name]
    
      if (defaultItem.type === "weapon") {
        defaultItem.main_bonus.dmg += Math.round(
          10 + (rar * rar * lvl * 8) / (2 * (rar + 1) + lvl)
        );
      }
    
      for (const key in defaultItem.main_bonus) {
        if (defaultItem.main_bonus[key] === 0) {
          delete defaultItem.main_bonus[key];
        }
      }

      if (defaultItem.main_bonus.time) defaultItem.main_bonus.time = +(defaultItem.main_bonus.time.toFixed(2))
    
      return defaultItem;
}

const getDrop = (lvl, botLvl, diff, dropBonus = 1) => {
  const chancesTable = drop_items_rarity_chances[diff]
  let increaseChance = Math.round((1 - 0.05 * (lvl - botLvl)) * dropBonus)
  const drop = []

  chancesTable.forEach((el, index) => {
    if (el === 0) return
    const realChance = el * increaseChance
    if (realChance >= 100) {
      for(let i = 0; i < Math.round(realChance/100); i++) {
        drop.push(getItem(botLvl, index))
      }
    } else if (el > Math.random() * 100) drop.push(getItem(botLvl, index))
  })

  return drop
}


exports.getDrop = getDrop