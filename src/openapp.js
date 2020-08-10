function isFunc(fun) {
  return typeof fun === 'function'
}

function isEmpty(str) {
  if (typeof str === undefined || str === null || str === '') return true
  return false
}

// 获取浏览器信息
function getBrowerInfo() {
  const ua = window.navigator.userAgent.toLowerCase()
  const isAndroid = /Android/i.test(ua)
  const isIOS = /iPhone|iPad|iPod/i.test(ua)

  let versionArr = []
  if (isIOS) versionArr = ua.match(/OS\s([0-9_]*)/i)
  if (isAndroid) versionArr = ua.match(/Android\s([0-9\.]*)/i)
  const version = (versionArr && versionArr.length) ? versionArr[1].replace(/_/g, '.') : ''

  return {
    isIOS,
  	isAndroid,
    version
  }
}

const { isIOS, isAndroid, version } = getBrowerInfo()

// 静默打开 app
function silenceOpen(url) {
  // 出于对安全的考虑, 大部分浏览器禁止了 iframe 的 scheme 跳转
  // let iFrame = document.createElement('iframe')
  // iFrame.style.display = 'none'
  // iFrame.src = url
  // document.documentElement.appendChild(iFrame)
  // setTimeout(() => {
  //   document.documentElement.removeChild(iFrame)
  // }, 0)
  window.location.href = url
}

// 通过延迟判断是否打开 app 失败
function bindSchemeOpenFail(callback, delay) {
  const start = Date.now()
  const loadTimer = setTimeout(function() {
    if (document.hidden || document.webkitHidden) return
    if (Date.now() - start < delay + 200) callback()
  }, delay)
  const visibilitychange = function() {
    if (document.hidden || document.webkitHidden) {
      clearTimeout(loadTimer)
    }
  }
  document.addEventListener('visibilitychange', visibilitychange, false)
  document.addEventListener('webkitvisibilitychange', visibilitychange, false)
  window.addEventListener('pagehide', function() {
    clearTimeout(loadTimer)
  }, false)
}

// 获取是不是在被禁用的 app 中, 有则返回 app 的浏览器标示
function getDisabledApp(disabledScheme) {
  const ua = window.navigator.userAgent
  for (let i = 0; i < disabledScheme.length; i++) {
    const reg = new RegExp(disabledScheme[i], 'i')
    if (reg.test(ua)) return disabledScheme[i]
  }
  return ''
}

class OpenApp {
  constructor({
    scheme = '',
    deepLink = '',
    download = { 
      ios: '',
      android: '',
      other: ''
    },
    delay = 5000,
    disabledScheme = [],
    onDisabled,
    onBeforeOpen,
    onTimeout
  }) {
    this.scheme = scheme
    this.deepLink = deepLink
    this.download = download
    this.delay = delay
    this.isDisabled = disabledScheme.length > 0 ? getDisabledApp(disabledScheme) : ''
    this.onDisabled = onDisabled
    this.onBeforeOpen = onBeforeOpen
    this.onTimeout = onTimeout
    this.init()
  }

  init() {
    if (!isIOS && !isAndroid) {
      this.downloadApp()
      return
    }
    if (this.isDisabled !== '') {
      this.onSchemeDisabled()
      return
    }
    this.onSchemeOpen()
  }

  onSchemeOpen() {
    this.beforeSilenceOpen()
    const isGreatThanIOS8 = isIOS && window.parseInt(version) > 8 // ios9 及以上支持深链接
    if (isGreatThanIOS8 && !isEmpty(this.deepLink)) {
      silenceOpen(this.deepLink)
      return
    }
    silenceOpen(this.scheme)
    this.onSchemeFailed()
  }

  // scheme 打开失败
  onSchemeFailed() {
    bindSchemeOpenFail(() => {
      if (isFunc(this.onTimeout)) {
        this.onTimeout()
      } else {
        this.downloadApp()
      }
    }, this.delay)
  }

  // 在 scheme 跳转被禁用的 app 里
  onSchemeDisabled() {
    if (isFunc(this.onDisabled)) {
      this.onDisabled(this.isDisabled)
    } else {
      this.downloadApp()
    }
  }

  // 在执行跳转逻辑钱
  beforeSilenceOpen() {
    if (isFunc(this.onBeforeOpen)) this.onBeforeOpen()
  }

  // 下载 app
  downloadApp() {
    const { ios = '', android = '', other = '' } = this.download
    if (isIOS) {
      if (ios !== '') window.location.href = ios
      return
    } 
    if (isAndroid) {
      if (android !== '') window.location.href = android
      return
    }
    if (other !== '')  window.location.href = other
  }
}

function openapp(options) {
  new OpenApp(options)
}

if (!window.$openapp) window.$openapp = openapp
export default openapp
