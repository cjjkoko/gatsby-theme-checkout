export let API_ENDPOINTS = 'http://local.wow/graphql'
class HttpUrl {

  constructor () {
    this.initStatus(0)
  }

  static initBase (type) {
    switch (type) {
      case 0://local
        API_ENDPOINTS = true?'https://3.209.27.177/graphql':'/api3'
        break
    }
  }

  init = (name) => {
    this.initStatus(0)
  }

  initStatus = (status) => {
    HttpUrl.initBase(status)
  }
}

export default new HttpUrl()
