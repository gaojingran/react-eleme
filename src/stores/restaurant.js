

import Toast from 'components/toast'
import omit from 'lodash.omit'
import { getGeolocation, getFoodSiftFactors, getShopList, getTotalCategory } from '../api'
import { homeUpdate } from './home'

const UPDATE = 'RESTAURANT_UPDATE'

const initState = {
  loading: true,
  category: [],
  siftFactors: [],
  selectFactorsId: undefined,
  shopList: [],
  rank_id: undefined,
  order_by: 0,
  super_vip: undefined,
  restaurant_category_ids: [],
}

export const restaurant = (state = initState, action) => {
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

export const restaurantUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const restaurantDestroy = () => {
  return {
    payload: initState,
    type: UPDATE,
  }
}

export const restaurantInit = (params) => {
  return async (dispatch, getState) => {
    let { locationInfo } = getState().home
    const { rank_id, order_by, super_vip } = getState().restaurant
    if (!locationInfo.latitude && !locationInfo.longitude) {
      try {
        const { data } = await getGeolocation()
        if (data) {
          locationInfo = data
          dispatch(homeUpdate({
            locationInfo: data,
          }))
        }
      } catch ({ err }) {
        return Toast.info(err)
      }
    }
    const location = omit(locationInfo, 'address')
    try {
      const [siftFactors, shopList, category] = await Promise.all([
        getFoodSiftFactors({
          ...location,
          entry_id: params.entry_id,
          terminal: 'h5',
        }),
        getShopList({
          ...location,
          rank_id,
          order_by,
          super_vip,
          terminal: 'h5',
          offset: 0,
          limit: 8,
          extras: ['activities', 'tags'],
          restaurant_category_ids: params.restaurant_category_id,
        }),
        getTotalCategory({ ...location }),
      ])
      const categorys = category.data.filter(v => v.id)
      dispatch(restaurantUpdate({
        category: categorys,
        sub_categories: categorys[0].sub_categories,
        loading: false,
        selectFactorsId: siftFactors.data.length ? siftFactors.data[0].id : undefined,
        siftFactors: siftFactors.data,
        rank_id: shopList.data.rank_id,
        shopList: shopList.data.items,
        restaurant_category_ids: params.restaurant_category_id,
      }))
    } catch ({ err }) {
      Toast.info(err)
    }
  }
}

