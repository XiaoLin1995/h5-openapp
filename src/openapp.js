function isFunc(fun) {
  return typeof fun === 'function'
}

// 获取浏览器信息
function getBrowerInfo() {
  const ua = window.navigator.userAgent.toLowerCase()
  const isAndroid = /android/i.test(ua)
  const isIOS = /iphone|ipad|ipod/i.test(ua)

  let versionArr = []
  if (isIOS) versionArr = ua.match(/os\s([0-9_]*)/)
  if (isAndroid) versionArr = ua.match(/android\s([0-9\.]*)/)
  const version = (versionArr && versionArr.length) ? versionArr[1].replace(/_/g, '.') : ''

  return {
  	isIOS,
  	isAndroid,
    version
  }
}

// 静默打开 app
function silenceOpen(url) {
  // iFrame 实测 Android 挺多浏览器不支持
  // iFrame = document.createElement('iframe')
  // iFrame.setAttribute('src', url)
  // iFrame.setAttribute('style', 'display:none')
  // iFrame.setAttribute('height', '0px')
  // iFrame.setAttribute('width', '0px')
  // iFrame.setAttribute('frameborder', '0')
  // document.body.appendChild(iFrame)
  // iFrame.parentNode.removeChild(iFrame)
  // iFrame = null

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
function getDisabledApp(disabledApp) {
  const ua = window.navigator.userAgent.toLowerCase()
  for (let i = 0; i < disabledApp.length; i++) {
    const reg = new RegExp(disabledApp[i] + '/', 'i')
    if (reg.test(ua)) return disabledApp[i]
  }
  return ''
}


const { isIOS, isAndroid, version } = getBrowerInfo()

class OpenApp {
  constructor({
    scheme = '',
    deepLink = '',
    download = { 
      ios: '',
      android: '',
      other: ''
    },
    delay = 3000,
    disabledApp = [],
    onDisabled,
    onBeforeOpen,
    onTimeout
  }) {
    this.scheme = scheme
    this.deepLink = deepLink
    this.download = download
    this.delay = delay
    this.isDisabled = disabledApp.length > 0 ? getDisabledApp(disabledApp) : ''
    this.onDisabled = onDisabled
    this.onBeforeOpen = onBeforeOpen
    this.onTimeout = onTimeout
    this.init()
  }

  init() {
    if (this.deepLink === '') {
      this.notSetDeepLink()
      return
    }
    this.isSetDeepLink()
  }

  // 设置了深链接
  isSetDeepLink() {
    const canDeepLink = isIOS && window.parseInt(version) >= 9 // ios9 以上支持深链接

    if (canDeepLink) { // 支持深链接
      this.beforeSilenceOpen()
      silenceOpen(this.deepLink)
      return
    }

    this.notSetDeepLink()
  }

  // 没有设置深链接
  notSetDeepLink() {
    if (!isIOS && !isAndroid) {
      this.downloadApp()
      return
    }
    if (this.isDisabled === '') {
      this.beforeSilenceOpen()
      silenceOpen(this.scheme)
      this.schemeFailed()
      return
    }
    this.schemeDisabled()
  }

  // scheme 打开失败
  schemeFailed() {
    bindSchemeOpenFail(() => {
      if (isFunc(this.onTimeout)) {
        this.onTimeout()
      } else {
        this.downloadApp()
      }
    }, this.delay)
  }

  // 在 scheme 跳转被禁用的 app 里
  schemeDisabled() {
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
