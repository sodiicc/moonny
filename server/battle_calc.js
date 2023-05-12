const is_hit = (dex, e_acc) => {
  return Math.random() > 0.25 * ((4 + e_acc) / (4 + dex))
}

function dmg_char(dmg, e_str, e_lvl) {
  return dmg * (1 - (e_str / (e_lvl + 8)) * 0.12) * (Math.random() / 2.5 + 0.8)
}

function crit_chance(str, acc, lvl) {
  return 0.05 * (1 + ((str * acc) / ((lvl * lvl + 3) * 0.7)) * 0.024)
}

function crit_power(vit, dex, lvl) {
  return 2 * (1 + ((vit * dex) / ((lvl * lvl + 3) * 0.7)) * 0.008)
}

function calc(
  lvl,
  dmg,
  dex,
  str,
  acc,
  vit,
  e_lvl,
  e_str,
  e_acc,
  answer_time = 5,
  interval = 6,
  is_char = false
) {
  if (!is_hit(dex, e_acc) || (answer_time > interval && is_char)) return [0, false]

  let is_crit = crit_chance(str, acc, lvl) > Math.random()

  let damage =
    dmg_char(dmg, e_str, e_lvl) * (is_crit ? crit_power(vit, dex, lvl) : 1)
    
  if (is_char) {
    const time = answer_time > interval * 0.2 ? answer_time - interval * 0.2 : 0
    damage = 3 * damage * Math.pow(1 - (time / interval), 1.8)
  }

  return [Math.round(damage), is_crit]
}

exports.calc = calc
