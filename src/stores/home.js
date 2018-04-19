
import omit from 'lodash.omit'
import Toast from 'components/toast'
import { getGeolocation, getEntry, getBanner, getShopList } from '../api'

const UPDATE = 'HOME_UPDATE'

const initState = {
  init: false,
  topBarShrink: false,
  locationInfo: {},
  banner: [],
  entry: [],
  shoplist: [],
  rank_id: undefined,
}

export const home = (state = initState, action) => {
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

export const homeUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const homeInit = () => {
  return async (dispatch, getState) => {
    const { init } = getState().home
    if (init) return
    try {
      // 定理位置
      const geoInfo = await getGeolocation()
      dispatch(homeUpdate({ locationInfo: geoInfo.data }))
      const location = { ...omit(geoInfo.data, ['address']) }
      // 获取banner entry
      const [banner, entry, shoplist] = await Promise.all([
        getBanner(location),
        getEntry(location),
        getShopList({
          ...location,
          terminal: 'h5',
          offset: 0,
          limit: 8,
          extra_filters: 'home',
          extras: ['activities', 'tags'],
          rank_id: '',
        }),
      ])
      dispatch(homeUpdate({
        banner: banner.data,
        entry: entry.data,
        shoplist: shoplist.data.items,
        rank_id: shoplist.data.rank_id,
        init: true,
      }))
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
