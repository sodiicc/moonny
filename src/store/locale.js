import localeDict from '../i18n/local.json'

const locale = function (state = localeDict['en'], action) {
  switch (action.type) {
    case 'SET_LANG':
      return (state = localeDict[action.payload])
    default:
      return state
  }
}

export default locale
