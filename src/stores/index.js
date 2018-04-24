

import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { home } from './home'
import { globalState } from './global'

const store = createStore(
  combineReducers({
    home,
    globalState,
  }),
  applyMiddleware(thunk),
)

export default store
