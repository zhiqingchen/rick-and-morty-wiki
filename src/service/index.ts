import Taro from "@tarojs/taro";
import {
  GetCharacterType,
  GetEpisodeType,
  GetLocationType,
} from './types'


let baseUrl = "https://rickandmortyapi.com/api/";
if (process.env.TARO_ENV === 'weapp') {
  baseUrl = 'https://rickandmortyapi.cavano.vip/'
}

const request: any = (endpointUrl: string) => {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}${endpointUrl}`
    Taro.request({
      url
    }).then(response => {
      const { statusCode } = response;
      if (statusCode >= 200 && statusCode < 300) {
        resolve(response)
      } else {
        reject(response)
      }
    })
      .catch(err => reject(err))
  })
}

const validate = (qry) => {
  if (!qry) {
    return ''
  }

  if (typeof qry === 'number' && Number.isInteger(qry) || Array.isArray(qry)) {
    return `/${qry}`
  }

  if (typeof qry === 'object') {
    return `/?${Object.keys(qry)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(qry[key])}`)
      .join('&')}`
  }

  throw new Error('As argument use an object, an array, an integer or leave it blank')
}

const getEndpoint = async (endpoint: string, opt: void | number | number[] | object) => {
  const query = validate(opt)

  try {
    const { data } = await request(endpoint + query)
    return data
  } catch (e) {
    Taro.showToast({
      title: '网络出错',
      icon: 'none',
      duration: 2000,
    })
    return null
  }
}


// 获取角色数据
export const getCharacter: GetCharacterType = {
  all: () => getEndpoint('character'),
  one: (id) => getEndpoint('character', id),
  list: (ids) => getEndpoint('character', ids),
  filt: (filter) => getEndpoint('character', filter)
}

// 获取地点数据
export const getLocation: GetLocationType = {
  all: () => getEndpoint('location'),
  one: (id) => getEndpoint('location', id),
  list: (ids) => getEndpoint('location', ids),
  filt: (filter) => getEndpoint('location', filter)
}

// 获取剧集数据
export const getEpisode: GetEpisodeType = {
  all: () => getEndpoint('episode'),
  one: (id) => getEndpoint('episode', id),
  list: (ids) => getEndpoint('episode', ids),
  filt: (filter) => getEndpoint('episode', filter)
}