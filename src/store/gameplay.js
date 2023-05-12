const gameplayInitialState = { name: '', login: false, hideDmg: true, token: '' }
const gameplay = function (state = gameplayInitialState, action) {
  switch (action.type) {
    case 'HIDE_DMG':
      return { ...state, hideDmg: action.payload }
    default:
      return state
  }
}

export default gameplay