const rand_range = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const get_limits_summ = (lvl) => {
  const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
  let min = 1
  let max = 3

  let deca = Math.floor(lvl / 10)

  for (let i = 0; i <= Math.floor(lvl / 10); i++) {
    min += fib[i] * (deca ? 10 : lvl % 10)
    max += fib[i + 2] * (deca ? 10 : lvl % 10)
    deca -= 1
  }

  return [min, max]
}

function get_limits_mult(lvl) {
  const fib = [1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
  let min = 1
  let max = 2

  let deca = (lvl / 12) >> 0

  for (let i = 0; i <= Math.floor(lvl / 12); i++) {
    let rest = lvl % 12
    min += fib[i] * (deca ? 4 : (rest / 3) >> 0)
    max += fib[i + 3] * (deca ? 4 : (rest / 3) >> 0)
    if (rest % 3 == 1) max += 1
    else if (rest % 3 == 2) max += 2
    deca -= 1
  }
  return [min, max]
}

const level_1_challenge = (level, float_x = false) => {
  let [min, max] = get_limits_summ(level)
  let random = Math.round(Math.random())

  let a = rand_range(min, max)
  let b = rand_range(min, max)
  let x = a + b
  let sign = random ? '+' : '-'

  if (random) {
    sign = '+'
  } else {
    sign = '-'
    if (b > a) {
      [a, b] = [b, a]
    }
    a = Math.round(a * 1.3)
    x = a - b
  }
  if (float_x)
    return Math.random() > 0.5
      ? [`x ${sign} ${b} = ${x}`, a + '']
      : [`${a} ${sign} x = ${x}`, b + '']

  return [`${a} ${sign} ${b} = ?`, x + '']
}

//***************************************************************************************** */

function level_2_challenge_1(level) {
  let limits = get_limits_mult(level)
  let min = limits[0]
  let max = limits[1]

  let a = rand_range(min, max)
  let b = rand_range(min, max)
  let c = a * b
  let x = c
  let operation = rand_range(0, 1)
  let sign = '*'

  if (operation) {
    sign = '/'
    x = a
    ;[a, c] = [c, a]
  }
  return [`${a} ${sign} ${b} = ?`, x + '']
}

function level_2_challenge(level) {
  let ret =
    Math.random() > 0.5
      ? level_1_challenge(level, true)
      : level_2_challenge_1(level)

  return ret
}

function level_3_challenge(level) {
  let randomizer = rand_range(0, 3)
  let x_place_randomizer = rand_range(0, 2)
  let limits = get_limits_summ(level)
  let min = limits[0]
  let max = limits[1]

  let a = rand_range(min, max)
  let b = rand_range(min, max)
  let c = rand_range(min, max)

  let sign1 = '+'
  let sign2 = '+'
  let d = a + b + c

  if (randomizer == 1) {
    sign2 = '-'
    d = a + b - c
    if (d < 0) {
      ;[d, c] = [c, -d]
      sign2 = '+'
    }
  } else if (randomizer == 2) {
    sign1 = '-'
    d = a - b + c
    if (d < 0) {
      ;[d, b] = [b, -d]
      sign1 = '+'
    }
  } else {
    sign1 = '-'
    sign2 = '-'
    d = a - b - c
    if (d < 0) {
      ;[d, b] = [b, -d]
      sign1 = '+'
    }
  }

  let x = a
  let a_mod = 'x'
  let b_mod = b
  let c_mod = c

  if (x_place_randomizer == 1) {
    x = b
    a_mod = a
    b_mod = 'x'
    c_mod = c
  } else {
    x = c
    a_mod = a
    b_mod = b
    c_mod = 'x'
  }

  return [`${a_mod} ${sign1} ${b_mod} ${sign2} ${c_mod} = ${d}`, x + '']
}

function level_4_challenge(level) {
  let randomizer = rand_range(0, 1)
  let side_randomizer = rand_range(0, 1)
  let x_place_randomizer = rand_range(0, 2)
  let limits = get_limits_summ(level)
  let min = limits[0]
  let max = limits[1]

  let a = rand_range(min, max)
  let b = rand_range(min, max)
  let c = rand_range(min, max)

  let sign1 = '-'
  let sign2 = '+'
  let d = a - b + c
  if (d < 0) {
    [d, b] = [b, -d]
    sign1 = '+'
  }

  if (randomizer == 1) {
    sign2 = '-'
    d = a - b - c
    if (d < 0) {
      [d, b] = [b, -d]
      sign1 = '+'
    }
  }

  let x = a
  let a_mod = 'x'
  let b_mod = b
  let c_mod = c
  
  if (x_place_randomizer === 1) {
    x = b
    a_mod = a
    b_mod = 'x'
  } else if ( x_place_randomizer === 2) {
    x = c
    a_mod = a
    c_mod = 'x'
  }

  if (sign1 == '-' && sign2 == '+') sign2 = '-'
  else if (sign1 == '-' && sign2 == '-') sign2 = '+'

  return side_randomizer
    ? [`${d} = ${a_mod} ${sign1} (${b_mod} ${sign2} ${c_mod})`, x + '']
    : [`${a_mod} ${sign1} (${b_mod} ${sign2} ${c_mod}) = ${d}`, x + '']
}

exports.difficulty = [
  level_1_challenge,
  level_2_challenge,
  level_3_challenge,
  level_4_challenge,
]
