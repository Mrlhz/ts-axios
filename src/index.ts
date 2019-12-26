import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { transformRequest } from './helper/data'
import buildURL from './helper/url'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
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
export default axios
