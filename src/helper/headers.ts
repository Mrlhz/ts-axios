import { isPlainObject } from './utils'

/**
 * @description 规范化处理header属性
 * @param {*} headers
 * @param {string} normalizedName
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * @description 配置 Content-Type，没有配置则默认为application/json
 * @export
 * @param {*} headers
 * @param {*} data
 * @returns {*}
 */
export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

/**
 * @description header string to object
 * @export
 * @param {string} headers
 * @returns {object}
 */
export function parseHeaders(headers: string) {
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return

    if (value) {
      value = value.trim()
    }

    parsed[key] = value
  })

  return parsed
}
