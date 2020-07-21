function getBrowerInfo() {
  const ua = window.navigator.userAgent.toLowerCase();
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);

  let versionArr = [];
  if (isIOS) versionArr = ua.match(/os\s([0-9_]*)/);
  if (isAndroid) versionArr = ua.match(/android\s([0-9\.]*)/);
  const version = (versionArr && versionArr.length) ? versionArr[1].replace(/_/g, '.') : ''

  return {
  	isIOS,
  	isAndroid,
    version
  }
}

function silenceOpen(url) {
  // iFrame 实测 Android 挺多浏览器不支持
  // iFrame = document.createElement("iframe");
  // iFrame.setAttribute("src", url);
  // iFrame.setAttribute("style", "display:none;");
  // iFrame.setAttribute("height", "0px");
  // iFrame.setAttribute("width", "0px");
  // iFrame.setAttribute("frameborder", "0");
  // document.body.appendChild(iFrame);
  // iFrame.parentNode.removeChild(iFrame);
  // iFrame = null;

  window.location.href = url
}

const { isIOS, isAndroid, version} = getBrowerInfo()
const isIOS9 = isIOS && parseInt(version) >= 9

function bindSchemaOpenFail(callback, delay) {
  var start = Date.now();
  var loadTimer = setTimeout(function() {
    if (document.hidden || document.webkitHidden) return;
    if (Date.now() - start < delay + 200) callback()
  }, delay);
  var visibilitychange = function() {
    if (document.hidden || document.webkitHidden) {
      clearTimeout(loadTimer);
    }
  };
  document.addEventListener("visibilitychange", visibilitychange, false);
  document.addEventListener("webkitvisibilitychange", visibilitychange, false);
  window.addEventListener("pagehide", function() {
    clearTimeout(loadTimer)
  }, false)
}

function unSchemaOpenApp({ ios, android, other }) {
  if (isIOS) {
    if (ios) window.location.href = ios
  } else if (isAndroid) {
    if (android) window.location.href = android
  } else {
    if (other) window.location.href = other
  }
}

function getDisabledApp(disabledApp) {
  const ua = window.navigator.userAgent.toLowerCase();
  for (let i = 0; i < disabledApp.length; i++) {
    const reg = new RegExp(disabledApp[i] + '/', 'i');
    if (reg.test(ua)) return disabledApp[i];
  }
  return '';
}

function openApp({
  scheme,
  links,
  download = {
    ios: '',
    android: '',
    other: ''
  },
  delay = 3000,
  disabledApp = ['MicroMessenger', 'DingTalk'],
  onDisabled,
  onOpenFailed
}) {
  const app = getDisabledApp(disabledApp)
  const isSchemaOpen = isIOS9 || app === '';
  if (isSchemaOpen) {
    silenceOpen(isIOS9 ? links : scheme);
    bindSchemaOpenFail(function() {
      if (onOpenFailed && typeof onOpenFailed === 'function') {
        onOpenFailed();
      } else {
        unSchemaOpenApp(download);
      }
    }, delay);
  } else {
    if (onDisabled && typeof onDisabled === 'function') {
      onDisabled(app);
    } else {
      unSchemaOpenApp(download);
    }
  }
}

window.$openApp = openApp;

export default openApp;
