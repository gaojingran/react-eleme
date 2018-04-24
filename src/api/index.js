

import HttpUtils from './http'

const position = new AMap.Geolocation({
  enableHighAccuracy: true,
  maximumAge: 0,
  convert: true,
})

export const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    position.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        resolve({
          data: {
            latitude: result.position.lat,
            longitude: result.position.lng,
            address: result.formattedAddress,
          },
        })
      } else {
        reject({
          err: result.message,
        })
      }
    })
  })
}
export const getEntry = (params) => { return HttpUtils.get('/elm/entry', params) }
export const getBanner = (params) => { return HttpUtils.get('/elm/banner', params) }
export const getShopList = (params) => { return HttpUtils.get('/elm/restaurants', params) }

export const mobileSendCode = (params) => { return HttpUtils.post('/elm/mobile_send_code', params) }
export const loginByMobile = (params) => { return HttpUtils.post('/elm/login_by_mobile', params) }
export const getUserInfo = (params) => { return HttpUtils.get('/elm/users', params) }
