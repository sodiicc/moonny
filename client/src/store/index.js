import { createStore, combineReducers } from 'redux'
import user from './user'
import character from './character'
import bot from './bot'
import fight_info from './fight_info'
import locale from './locale'
import gameplay from './gameplay'

let Reducer = combineReducers({ user, locale, character, bot, fight_info, gameplay })
let store = createStore(Reducer)

export default store
