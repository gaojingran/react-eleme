

import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { home } from './home'
import { globalState } from './global'
import { order } from './order'
import { shop } from './shop'
import { compass } from './compass'
import { restaurant } from './restaurant'

const store = createStore(
  combineReducers({
    home,
    globalState,
    order,
    shop,
    compass,
    restaurant,
  }),
  applyMiddleware(thunk),
)

export default store
