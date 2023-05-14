// require('dotenv').config()

let url = 'http://127.0.0.1:9000/'
// let url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000/'
const get_headers = (token = localStorage.getItem('token')) => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}
const post_headers = (data) => {
  return {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }
}

// export const post = (endPoint, data = {}) => fetch(url + endPoint, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     credentials: "include"
// })

export const post = (endPoint, data = {}) =>
  fetch(url + endPoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const postNoData = (endPoint) =>
  fetch(url + endPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

export const get = (endPoint) =>
  fetch(url + endPoint, get_headers()).then((res) => res.json())

export const setBot = (lvl, diff, nickname) =>
  fetch(
    `${url}newbot?lvl=${lvl}&diff=${diff}&nickname=${nickname}`,
    get_headers()
  ).then((res) => res.json())

export const get_task = (lvl, diff, nickname) =>
  fetch(
    `${url}task?lvl=${lvl}&diff=${diff}&nickname=${nickname}`,
    get_headers()
  ).then((res) => res.json())

export const get_answer = (value, nickname) =>
  fetch(
    `${url}answer?value=${value}&nickname=${nickname}`,
    get_headers()
  ).then((res) => res.json())

export const get_char_info = (user, token) =>
  fetch(`${url}character/${user}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())

export const get_bot_info = (user) =>
  fetch(`${url}bot/${user}`, get_headers()).then((res) => res.json())

export const battle_result = (user) =>
  fetch(`${url}battleresult/${user}`, get_headers()).then((res) => res.json())

export const up_stats = (nickname, stat) =>
  fetch(
    `${url}stats?nickname=${nickname}&stat=${stat}`,
    get_headers()
  ).then((res) => res.json())

export const get_exp = (lvl, bot_lvl, diff, token) =>
  fetch(
    `${url}getexp?lvl=${lvl}&botlvl=${bot_lvl}&diff=${diff}`,
    get_headers(token)
  ).then((res) => res.json())

export const get_all_bot_exp = (lvl, bot_lvl) =>
  fetch(
    `${url}getallbotexp?lvl=${lvl}&botlvl=${bot_lvl}`,
    get_headers()
  ).then((res) => res.json())

export const login = (data) =>
  fetch(`${url}signin`, post_headers(data)).then((res) => res.json())

export const wear_item = (id, wear, type, character_name, token) =>
  fetch(
    `${url}wearitem?id=${id}&wear=${wear}&type=${type}&character_name=${character_name}`,
    get_headers(token)
  ).then(res => res.json())
