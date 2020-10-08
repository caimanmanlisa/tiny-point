switch (process.env.NODE_ENV) {
  case 'production_uat':
    window.__baseUrl = ''
    // window.__baseUrl = '//app-uat.baoinfo.cn'
    break
  case 'production':
    window.__baseUrl = '//production'
    // window.__baseUrl = '//pkufi-perftest.zhongan.io'
    break
  case 'development':
    // window.__baseUrl = ''
    window.__baseUrl = '//sksigmar.com:81'
    break
  default:
    window.__baseUrl = ''
}

const baseUrl = window.__baseUrl

export default baseUrl
