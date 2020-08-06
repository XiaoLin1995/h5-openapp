# h5-openapp

> 网页唤醒 APP


## 安装

```
npm install h5-openapp
```
or
```
yarn add h5-openapp
```

## 使用

### 在 vue 中

```html
<template>
  <div>
    <button @click="clickBtn"/>  
  <div>
<template>

<script>
import openapp from 'h5-openapp'

export default {
  methods: {
    clickBtn() {
      // ... 如果对参数有其它逻辑处理, 在调用前处理
      openapp({
        scheme: '', // eg: myapp://path?key1=value1&key2=value2
        deepLink: '', // iOS universal links (iOS 9+)
        download: { // 默认 scheme 跳转无效，便前往下载, 设置 onTimeout 回调时, 不执行下载逻辑
          ios: '', // ios 下载链接
          android: '', // android 下载链接
          other: '' // 其他渠道 下载链接
        },
        delay: 3000, // 等待时间, 超时后执行 onTimeout,  default: 3000
        disabledApp: [], // scheme 被禁用的 APP, eg: ['MicroMessenger', 'DingTalk', '...'] (iOS 9+ 深链接不会被禁)
        onDisabled: function(appTag) { // 当打开网页的 APP 为 disabledApp 中的任一个，并且未设置深链接时
          if (appTag === 'MicroMessenger') {
            console.log('微信不支持 scheme 跳转')
          } else if (appTag === 'DingTalk') {
            console.log('钉钉不支持 scheme 跳转')
          } else {
            console.log(appTag)
          }
        },
        onBeforeOpen: function() {
          // 在执行打开 app 逻辑前触发
        },
        onTimeout: function() { // 触发打开 app 逻辑, 并且超过等待时间时触发, 未设置的情况下, 如果设置了下载链接, 则默认跳转下载链接
          console.log('自定义超时处理')
        }
      })
    }
  }
}
</script>
```

### 在 jquery 中

```html
<script src="openapp.min.js"></script>
<script>
$('.btn').click(function() {
  $openapp({
    // ... 省略参数
  })
})
</script>
```

## 事件
| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| onDisabled | 不满足深链接跳转条件, 在 `disabledApp` 参数中的 App 里打开时触发 | / |
| onBeforeOpen | 在触发打开 App 逻辑前触发 | `disabledApp` 参数中的对应标示 |
| onTimeout | 触发打开 App 逻辑后, 并且等待时间超过 `delay`, 未设置时, 默认跳转下载, 下载链接也未设置, 超时则无响应 | / |

## 参数
| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ----- |
| scheme | scheme 跳转链接 (eg: myapp://path?key1=value1&key2=value2) | String | / |
| deepLink | iOS universal links (iOS 9+) | String | / |
| download | 默认超时会跳转下载链接 ({ ios: '', android: '', other: '' }) | Object | / |
| delay | 等待时间 | Number | 3000 |
| disabledApp | scheme 被禁用的 App 的浏览器标示 | Array | / |
