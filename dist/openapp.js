
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JSBridge"] = factory();
	else
		root["JSBridge"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isFunc(fun) {
  return typeof fun === 'function';
}

function isEmpty(str) {
  if ((typeof str === 'undefined' ? 'undefined' : _typeof(str)) === undefined || str === null || str === '') return true;
  return false;
}

// 获取浏览器信息
function getBrowerInfo() {
  var ua = window.navigator.userAgent.toLowerCase();
  var isAndroid = /Android/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua);
  var isSafari = /Safari/i.test(ua);
  var isApple = /Mac OS X/i.test(ua);
  var isIPad = isSafari && !isIOS && isApple && 'ontouchend' in document;
  if (isIPad) isIOS = true;

  var versionArr = [];
  if (isIOS) versionArr = ua.match(/OS\s([0-9_]*)/i);
  if (isAndroid) versionArr = ua.match(/Android\s([0-9\.]*)/i);
  var version = versionArr && versionArr.length ? versionArr[1].replace(/_/g, '.') : '';

  return {
    isIOS: isIOS,
    isAndroid: isAndroid,
    version: version
  };
}

var _getBrowerInfo = getBrowerInfo(),
    isIOS = _getBrowerInfo.isIOS,
    isAndroid = _getBrowerInfo.isAndroid,
    version = _getBrowerInfo.version;

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
  window.location.href = url;
}

// 通过延迟判断是否打开 app 失败
function bindSchemeOpenFail(callback, delay) {
  var start = Date.now();
  var loadTimer = setTimeout(function () {
    if (document.hidden || document.webkitHidden) return;
    if (Date.now() - start < delay + 200) callback();
  }, delay);
  var visibilitychange = function visibilitychange() {
    if (document.hidden || document.webkitHidden) {
      clearTimeout(loadTimer);
    }
  };
  document.addEventListener('visibilitychange', visibilitychange, false);
  document.addEventListener('webkitvisibilitychange', visibilitychange, false);
  window.addEventListener('pagehide', function () {
    clearTimeout(loadTimer);
  }, false);
}

// 获取是不是在被禁用的 app 中, 有则返回 app 的浏览器标示
function getDisabledApp(disabledScheme) {
  var ua = window.navigator.userAgent;
  for (var i = 0; i < disabledScheme.length; i++) {
    var reg = new RegExp(disabledScheme[i], 'i');
    if (reg.test(ua)) return disabledScheme[i];
  }
  return '';
}

var OpenApp = function () {
  function OpenApp(_ref) {
    var _ref$scheme = _ref.scheme,
        scheme = _ref$scheme === undefined ? '' : _ref$scheme,
        _ref$deepLink = _ref.deepLink,
        deepLink = _ref$deepLink === undefined ? '' : _ref$deepLink,
        _ref$download = _ref.download,
        download = _ref$download === undefined ? {
      ios: '',
      android: '',
      other: ''
    } : _ref$download,
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? 5000 : _ref$delay,
        _ref$disabledScheme = _ref.disabledScheme,
        disabledScheme = _ref$disabledScheme === undefined ? [] : _ref$disabledScheme,
        onDisabled = _ref.onDisabled,
        onBeforeOpen = _ref.onBeforeOpen,
        onTimeout = _ref.onTimeout;

    _classCallCheck(this, OpenApp);

    this.scheme = scheme;
    this.deepLink = deepLink;
    this.download = download;
    this.delay = delay;
    this.isDisabled = disabledScheme.length > 0 ? getDisabledApp(disabledScheme) : '';
    this.onDisabled = onDisabled;
    this.onBeforeOpen = onBeforeOpen;
    this.onTimeout = onTimeout;
    this.init();
  }

  _createClass(OpenApp, [{
    key: 'init',
    value: function init() {
      if (!isIOS && !isAndroid) {
        this.downloadApp();
        return;
      }
      if (this.isDisabled !== '') {
        this.onSchemeDisabled();
        return;
      }
      this.onSchemeOpen();
    }
  }, {
    key: 'onSchemeOpen',
    value: function onSchemeOpen() {
      this.beforeSilenceOpen();
      var isGreatThanIOS8 = isIOS && window.parseInt(version) > 8; // ios9 及以上支持深链接
      if (isGreatThanIOS8 && !isEmpty(this.deepLink)) {
        silenceOpen(this.deepLink);
        return;
      }
      silenceOpen(this.scheme);
      this.onSchemeFailed();
    }

    // scheme 打开失败

  }, {
    key: 'onSchemeFailed',
    value: function onSchemeFailed() {
      var _this = this;

      bindSchemeOpenFail(function () {
        if (isFunc(_this.onTimeout)) {
          _this.onTimeout();
        } else {
          _this.downloadApp();
        }
      }, this.delay);
    }

    // 在 scheme 跳转被禁用的 app 里

  }, {
    key: 'onSchemeDisabled',
    value: function onSchemeDisabled() {
      if (isFunc(this.onDisabled)) {
        this.onDisabled(this.isDisabled);
      } else {
        this.downloadApp();
      }
    }

    // 在执行跳转逻辑钱

  }, {
    key: 'beforeSilenceOpen',
    value: function beforeSilenceOpen() {
      if (isFunc(this.onBeforeOpen)) this.onBeforeOpen();
    }

    // 下载 app

  }, {
    key: 'downloadApp',
    value: function downloadApp() {
      var _download = this.download,
          _download$ios = _download.ios,
          ios = _download$ios === undefined ? '' : _download$ios,
          _download$android = _download.android,
          android = _download$android === undefined ? '' : _download$android,
          _download$other = _download.other,
          other = _download$other === undefined ? '' : _download$other;

      if (isIOS) {
        if (ios !== '') window.location.href = ios;
        return;
      }
      if (isAndroid) {
        if (android !== '') window.location.href = android;
        return;
      }
      if (other !== '') window.location.href = other;
    }
  }]);

  return OpenApp;
}();

function openapp(options) {
  new OpenApp(options);
}

if (!window.$openapp) window.$openapp = openapp;
exports.default = openapp;

/***/ })
/******/ ]);
});