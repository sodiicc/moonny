import CharInfo from '../components/_defaultData/CharInfo'

const character = function (state = CharInfo, action) {
  switch (action.type) {
    case 'SET_CHARACTER':
      // for (let key in action.payload) {
      //   state[key] = action.payload[key]
      // }
      return action.payload
    default:
      return state
  }
}

export default character
