import { isPlainObject } from './utils'

/**
 * @description 请求数据data解析成 JSON
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

/**
 * @description 响应数据data解析成 JSON
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // TODO
      // console.log(e)
    }
  }

  return data
}
