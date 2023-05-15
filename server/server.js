require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const tasks = require('./tasks')
const { tables } = require('./tables')
const query = require('./query')
const battle_calc = require('./battle_calc')
const exp_calc = require('./exp_calc')
const bot_generator = require('./bot_generator')
// const { request } = require('express')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('./authMiddleware')
const { getDrop } = require('./items')
// const {bonus_for_sets} = require('./dictionary')
const { getCharacterData } = require('./helper')


const port = process.env.PORT || 9000
const app = express()
app.use(cors())
app.use(express.json())
app.use(authMiddleware)
app.use(express.urlencoded({
  extended: true
}))

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5431")
})
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'MoonnyMathics',
//   password: 'trader32',
//   port: 5432,
// })
// client.connect();

const execute = async query => {
  try {
    await pool.connect();
    await pool.query(query);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

tables.forEach(table => {
  execute(table).then(result => {
    console.log('result', result)
    if (result) {
      console.log('Table created');
    }
  });
})

app.get('/character/:name', async (req, res) => {
  const char = await pool.query(query.get_char_info, [req.params.name])
  const items = await pool.query(query.get_items, [req.params.name])
  const charData = getCharacterData(char.rows[0], items.rows)

  res.send(charData)
})

app.post('/register', async (req, res) => {
  const character = await pool.query(query.check_character, [req.body.username])
  if (character.rows[0].count === '0') {
    pool.query(
      query.create_character,
      [req.body.username, req.body.password],
      (err, response) => {
        pool.query(query.create_bot, [
          req.body.username + 'Bot',
          req.body.username,
        ])
        res.sendStatus(200)
      }
    )
  } else {
    res.sendStatus(401)
  }
})

app.post('/signin', (req, res) => {
  const { username, password } = req.body
  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '24h' })
  pool.query(query.check_auth, [username, password])
    .then(response => {
      if (response.rows[0].count === '1') res.status(200).json({ token, username })
      else res.sendStatus(401)
    })
})

app.get('/getexp', (req, res) => {
  const lvl = req.query.lvl
  const bot_lvl = req.query.botlvl
  const diff = req.query.diff
  const exp = exp_calc.get_real_exp(lvl, bot_lvl, diff) + ''
  res.send([exp])
})

app.get('/wearitem', ({ query: { id, wear, character_name, type } }, response) => {
  pool.query(query.get_wearing_items, [character_name, wear], (err, resp) => {
    const weared_item = resp.rows.find(el => el.type === type)
    if (!weared_item || !wear) {
      pool.query(query.set_wear_item, [id, wear], () => { })
      response.json(wear ? 'weared' : 'unweared')
    } else {
      pool.query(query.set_wear_item, [weared_item.id, false], () => { })
      pool.query(query.set_wear_item, [id, wear], () => { response.json(wear ? 'weared' : 'unweared') })
    }
  })
})

app.get('/getallbotexp', (req, res) => {
  const lvl = req.query.lvl
  const bot_lvl = req.query.botlvl
  const resultExp = []
  for (let i = 0; i < 6; i++) {
    const exp = exp_calc.get_real_exp(lvl, bot_lvl, i) + ''
    resultExp.push(exp)
  }
  res.send(resultExp)
})

app.get('/bot/:name', (req, res) => {
  pool.query(query.get_bot_info, [req.params.name], (err, response) => {
    res.send(response.rows)
  })
})

app.get('/stats', (req, res) => {
  const stat_name = req.query.stat
  const nickname = req.query.nickname

  pool.query(query.get_stat, [nickname], (err, response) => {
    const { free_stats } = response.rows[0]
    if (err) console.log(err)
    else res.send([200])

    if (free_stats > 0) pool.query(query[`set_${stat_name}`], [nickname])
  })
})

app.get('/newbot', (req, res) => {
  const diff = +req.query.diff
  const bot_lvl = +req.query.lvl
  const nickname = req.query.nickname

  let gen_bot = bot_generator.bot(bot_lvl, diff, nickname, 'Test_bot')
  const params = [
    gen_bot.nickname,
    gen_bot.lvl,
    gen_bot.hp,
    gen_bot.current_hp,
    gen_bot.str,
    gen_bot.vit,
    gen_bot.dex,
    gen_bot.acc,
    gen_bot.dmg,
    gen_bot.date,
    gen_bot.diff,
    gen_bot.attacker_nickname,
  ]

  pool.query(query.set_fullhp, [nickname])

  pool.query(query.set_bot, params, () => {
    res.send([200])
  })
})

app.get('/task', (req, res) => {
  const diff = req.query.diff
  const bot_lvl = req.query.lvl
  const nickname = req.query.nickname
  const [value, result] = tasks.difficulty[diff](bot_lvl)

  pool.query(query.create_task, [value, result, nickname, Date.now()])

  res.send([value, result.length])
})

app.get('/battleresult/:name', (req, res) => {
  pool.query(query.get_char_info, [req.params.name], (err, response) => {
    const {
      hp,
      exp,
      current_exp,
      current_hp,
      lvl,
      free_stats,
      bosses_defeat,
    } = response.rows[0]
    pool.query(query.set_hp_exp, [hp, current_exp, free_stats, req.params.name])
    if (err) res.send(err)
    else res.send([200])
  })
})

app.get('/answer', async (req, res) => {
  const value = req.query.value
  const nickname = req.query.nickname

  const get_res = await pool.query(query.get_result, [nickname])
  const task_params = get_res.rows[0]
  let result = task_params.result
  let created = task_params.created

  const char_info = await pool.query(query.get_char_info, [nickname])
  const char_native = char_info.rows[0]

  const items = await pool.query(query.get_items, [nickname])
  const char = getCharacterData(char_native, items.rows)

  const bot_info = await pool.query(query.get_current_bot_info, [nickname])
  const enemy = bot_info.rows[0]
  let [char_hit, is_char_crit] = battle_calc.calc(
    char.lvl,
    char.dmg,
    char.dex,
    char.str,
    char.acc,
    char.vit,
    enemy.lvl,
    enemy.str,
    enemy.acc,
    (Date.now() - created) / 1000,
    char.time,
    true
  )
  const [enemy_hit, is_enemy_crit] = battle_calc.calc(
    enemy.lvl,
    enemy.dmg,
    enemy.dex,
    enemy.str,
    enemy.acc,
    enemy.vit,
    char.lvl,
    char.str,
    char.acc
  )

  const leftHpForCheck = () => char.current_hp - enemy_hit

  if (value !== result) char_hit = 0
  let hp_left = char_native.current_hp - enemy_hit
  let enemy_hp_left = enemy.current_hp - char_hit
  let is_end = leftHpForCheck() < 1 || enemy_hp_left < 1

  let result_fight = null
  if (is_end)
    result_fight =
      leftHpForCheck() > enemy_hp_left
        ? 'win'
        : leftHpForCheck() < enemy_hp_left
          ? 'lose'
          : 'draw'
  let exp =
    result_fight === 'win'
      ? exp_calc.get_real_exp(char.lvl, enemy.lvl, enemy.diff)
      : 0

  const drop = is_end && result_fight === 'win' ? getDrop(char.lvl, enemy.lvl, enemy.diff) : []

  if (drop.length) {
    drop.forEach(item => {
      pool.query(
        query.create_item,
        [
          nickname,
          item.url,
          item.type,
          item.name,
          item.set_name,
          item.lvl,
          item.rar,
          false,
          item.main_bonus.hp || 0,
          item.main_bonus.str || 0,
          item.main_bonus.dex || 0,
          item.main_bonus.vit || 0,
          item.main_bonus.acc || 0,
          item.main_bonus.dmg || 0,
          item.main_bonus.time || 0,
        ]
      )
    })
  }

  let ret = {
    char_hit,
    enemy_hit,
    drop,
    is_end,
    result_fight,
    is_char_crit,
    is_enemy_crit,
    exp,
  }

  let set_current_exp = char.current_exp + exp
  let set_exp = char.exp
  let set_lvl = char.lvl
  let set_free_stats = char.free_stats
  let set_dmg = char_native.dmg
  if (set_current_exp >= exp_calc.get_level_exp(char.lvl)) {
    set_lvl += 1
    set_free_stats += 5
    set_exp = exp_calc.get_level_exp(set_lvl)
    set_current_exp -= char.exp
    set_dmg += Math.round(char_native.dmg * 0.08)
  }

  pool.query(
    query.set_character,
    [
      set_lvl,
      set_free_stats,
      hp_left,
      set_exp,
      set_current_exp,
      set_dmg,
      nickname,
    ]
  )
    .then(() => {
      pool.query(
        query.set_bot_hp,
        [enemy_hp_left, nickname],
        (err, response) => {
          res.send(ret)
        }
      )
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
