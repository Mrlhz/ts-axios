import { isPlainObject, isDate } from './utils'

/**
 * @description 处理请求 url 参数
 * @param {String} url
 * @param {Object} params
 * @returns {String} The formatted url
 */
export default function buildURL(url: string, params: any): string {
  if (!params) return url
  const paramsArr: string[] = []

  Object.keys(params).forEach(key => {
    const param = params[key]
    let values: string[]
    if (param === null || typeof param === 'undefined') {
      return
    }
    if (Array.isArray(param)) {
      key += '[]'
      values = param
    } else {
      values = [param]
    }

    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value)
      }

      paramsArr.push(`${encode(key)}=${encode(value)}`)
    })
  })

  let serializedParams = paramsArr.join('&')
  if (serializedParams) {
    let hashmarkIndex = url.indexOf('#')
    if (hashmarkIndex !== -1) {
      url = url.substring(0, hashmarkIndex)
    }
    url = url.indexOf('?') === -1 ? url + '?' : url + '&'
  }

  return url + serializedParams
}

/**
 * 特殊字符支持
 * 对于字符 @、:、$、,、、[、]，不进行encode处理
 * @param {string} val
 * @returns {string}
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
