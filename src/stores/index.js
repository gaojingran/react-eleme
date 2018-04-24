

import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { home } from './home'
import { globalState } from './global'
import { order } from './order'

const store = createStore(
  combineReducers({
    home,
    globalState,
    order,
  }),
  applyMiddleware(thunk),
)

export default store
