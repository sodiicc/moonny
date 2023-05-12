import BotInfo from '../components/_defaultData/BotInfo'

const bot = function (state = BotInfo, action) {
  switch (action.type) {
    case 'SET_BOT':
      for (let key in action.payload) {
        state[key] = action.payload[key]
      }
      return state
    default:
      return state
  }
}

export default bot
