import en from '../i18n/local/en.json'
import ukr from '../i18n/local/ukr.json'

const getLanguage = len => {
  let res = en
  switch (len) {
    case 'en': res = en
      break
    case 'ukr': res = ukr
      break  
    default: res = en
  }
  return res
}

const locale = function (state = en, action) {
  switch (action.type) {
    case 'SET_LANG':
      return (state = getLanguage(action.payload))
    default:
      return state
  }
}

export default locale
