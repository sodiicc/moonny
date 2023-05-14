const initialState = {
  char_hit: 0,
  enemy_hit: 30,
  drop: [],
  result_fight: '',
  is_end: false,
  is_char_crit: true,
  is_enemy_crit: false,
  exp: 0,
}

const fight_info = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_FIGHT':
      return (state = action.payload)
    default:
      return state
  }
}

export default fight_info
