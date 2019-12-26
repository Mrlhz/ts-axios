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
