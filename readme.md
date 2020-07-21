# openApp

> 网页唤醒 APP


## 安装

```
npm install h5-openapp
```

## 使用

```js
import openApp from 'h5-openapp'

openApp({
  scheme: '', // eg: myapp://path?key1=value1&key2=value2
  links: '', // iOS universal links (iOS 9+)
  download: { // scheme 跳转无效，便前往下载，设置 onOpenFailed 回调时，此参数无效
    ios: '', // ios 下载链接
    android: '', // android 下载链接
    other: '' // 其他渠道 下载链接
  },
  delay: 3000, // 等待时间, 超时后执行 onOpenFailed,  default: 3000
  disabledApp: [], // scheme 被禁用的 APP, default: ['MicroMessenger', 'DingTalk'] iOS 9+ 此参数无效，因为不需要）
  onDisabled: function (app) { // 当打开网页的 APP 为 disabledApp 中的任一个，并且设备不为 iOS9 以上时，执行此回调，默认为调整对应下载链接
    console.log(app) // MicroMessenger || DingTalk || ...
  },
  onOpenFailed: function () { // 打开 app 失败的回调, 默认为打开对应下载链接
    console.log('自定义失败处理')
  }
})

```
