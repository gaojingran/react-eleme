

import HttpUtils from './http'

export const getEntry = (params) => { return HttpUtils.get('/elm/entry', params) };
export const getBanner = (params) => { return HttpUtils.get('/elm/banner', params) };
