

import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { home } from './home'

const store = createStore(
  combineReducers({
    home,
  }),
  applyMiddleware(thunk),
)

export default store
