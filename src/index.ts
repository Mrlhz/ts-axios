import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import { transformRequest } from './helper/data'
import buildURL from './helper/url'
import { processHeaders } from './helper/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

/**
 * @description 处理请求数据
 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

/**
 * @description 处理请求 header
 */
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
