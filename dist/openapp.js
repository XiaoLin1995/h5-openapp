
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
function getBrowerInfo() {
  var ua = window.navigator.userAgent.toLowerCase();
  var isAndroid = /android/i.test(ua);
  var isIOS = /iphone|ipad|ipod/i.test(ua);

  var versionArr = [];
  if (isIOS) versionArr = ua.match(/os\s([0-9_]*)/);
  if (isAndroid) versionArr = ua.match(/android\s([0-9\.]*)/);
  var version = versionArr && versionArr.length ? versionArr[1].replace(/_/g, '.') : '';

  return {
    isIOS: isIOS,
    isAndroid: isAndroid,
    version: version
  };
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

  window.location.href = url;
}

var _getBrowerInfo = getBrowerInfo(),
    isIOS = _getBrowerInfo.isIOS,
    isAndroid = _getBrowerInfo.isAndroid,
    version = _getBrowerInfo.version;

var isIOS9 = isIOS && parseInt(version) >= 9;

function bindSchemaOpenFail(callback, delay) {
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
  document.addEventListener("visibilitychange", visibilitychange, false);
  document.addEventListener("webkitvisibilitychange", visibilitychange, false);
  window.addEventListener("pagehide", function () {
    clearTimeout(loadTimer);
  }, false);
}

function unSchemaOpenApp(_ref) {
  var ios = _ref.ios,
      android = _ref.android,
      other = _ref.other;

  if (isIOS) {
    if (ios) window.location.href = ios;
  } else if (isAndroid) {
    if (android) window.location.href = android;
  } else {
    if (other) window.location.href = other;
  }
}

function getDisabledApp(disabledApp) {
  var ua = window.navigator.userAgent.toLowerCase();
  for (var i = 0; i < disabledApp.length; i++) {
    var reg = new RegExp(disabledApp[i] + '/', 'i');
    if (reg.test(ua)) return disabledApp[i];
  }
  return '';
}

function openApp(_ref2) {
  var scheme = _ref2.scheme,
      links = _ref2.links,
      _ref2$download = _ref2.download,
      download = _ref2$download === undefined ? {
    ios: '',
    android: '',
    other: ''
  } : _ref2$download,
      _ref2$delay = _ref2.delay,
      delay = _ref2$delay === undefined ? 3000 : _ref2$delay,
      _ref2$disabledApp = _ref2.disabledApp,
      disabledApp = _ref2$disabledApp === undefined ? ['MicroMessenger', 'DingTalk'] : _ref2$disabledApp,
      onDisabled = _ref2.onDisabled,
      onOpenFailed = _ref2.onOpenFailed;

  var app = getDisabledApp(disabledApp);
  var isSchemaOpen = isIOS9 || app === '';
  if (isSchemaOpen) {
    silenceOpen(isIOS9 ? links : scheme);
    bindSchemaOpenFail(function () {
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

exports.default = openApp;

/***/ })
/******/ ]);
});