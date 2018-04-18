

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
          err: '定位失败',
        })
      }
    })
  })
}
export const getEntry = (params) => { return HttpUtils.get('/elm/entry', params) };
export const getBanner = (params) => { return HttpUtils.get('/elm/banner', params) };
