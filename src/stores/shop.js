

import Toast from 'components/toast'
import { getShopInfo, getShopRatings, getShopFood } from '../api'

const UPDATE = 'SHOP_UPDATE'

const initState = {
  loading: true,
  info: {},
  menu: [],
  foodMenuIndex: 0,
  ratings: [],
}

export const shop = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const shopUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const shopDestroy = () => {
  return {
    payload: initState,
    type: UPDATE,
  }
}

export const shopInit = (params) => {
  return async (dispatch) => {
    const { restaurant_id } = params
    try {
      const [info, menu, ratings] = await Promise.all([
        getShopInfo({
          ...params,
          terminal: 'h5',
          extras: ['activities', 'albums', 'license', 'identification', 'qualification'],
        }),
        getShopFood({ restaurant_id }),
        getShopRatings({
          restaurant_id,
          has_content: true,
          offset: 0,
          limit: 8,
        }),
      ])
      dispatch(shopUpdate({
        loading: false,
        info: info.data,
        menu: menu.data,
        ratings: ratings.data,
      }))
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
