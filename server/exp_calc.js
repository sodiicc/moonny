let exp_dictionary = {
  1: 100,
  2: 250,
  3: 475,
  4: 725,
  5: 1050,
  6: 1500,
  7: 2000,
  8: 2600,
  9: 3400,
  10: 4400,
  11: 5700,
  12: 7500,
  13: 10000,
  14: 14000,
  15: 19000,
  16: 25000,
  17: 33000,
  18: 42000,
  19: 53000,
  20: 67000,
  21: 85000,
  22: 110000,
  23: 150000,
  24: 200000,
  25: 300000,
  26: 450000,
  27: 680000,
  28: 1000000,
  29: 2000000,
  30: 5000000,
}

let exp_for_easy_bots = {
  1: 10,
  2: 15,
  3: 20,
  4: 25,
  5: 30,
  6: 35,
  7: 40,
  8: 45,
  9: 50,
  10: 60,
  11: 65,
  12: 70,
  13: 75,
  14: 80,
  15: 100,
  16: 110,
  17: 120,
  18: 130,
  19: 140,
  20: 160,
  21: 180,
  22: 200,
  23: 220,
  24: 240,
  25: 300,
  26: 330,
  27: 360,
  28: 390,
  29: 420,
  30: 500,
}

function get_level_exp(lvl) {
  return exp_dictionary[lvl]
}

function get_real_exp(your_lvl, bot_lvl, diff) {
  const increaser_exr = [1, 1.2, 1.8, 4.5, 18, 105]
  let exp = exp_for_easy_bots[bot_lvl] * increaser_exr[diff]
  let res = exp
  if (your_lvl > bot_lvl) {
    res = Math.round(
      exp * (0.9 - 0.03 * (your_lvl - bot_lvl) * (your_lvl - bot_lvl))
    )
  } else {
    return Math.round(exp)
  }

  if (res < 0) res = 0

  return Math.round(res)
}

exports.get_real_exp = get_real_exp
exports.get_level_exp = get_level_exp
