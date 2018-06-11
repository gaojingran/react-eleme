## React版高仿饿了么webApp
## 说明
> 此项目部分数据接口需要手机登陆后才能访问,我是在mac上开发的,并且只在chrome和safari以及自己的iphone上简单浏览测试了下,如果有什么问题欢迎提出😋,启动后webpack的warning是因为使用的postcss-viewport-units适配vw,wh,vmin,vmax后会在css的content的打上viewport-units-buggyfill, 所以当我用!important修改content时postcss-viewport-units会给出警告,如果看着不爽可以在node_modules/postcss-viewport-units/index.js中注释掉warning就行了

## 技术栈
>react, react-router4, redux, redux-thunk, betterScroll, webpack4

##项目运行
>首先clone数据接口,请确保3333端口没被占用或自行更改app/app.js中的端口号，🙈因为重点是前端(其实是我不会后端😂)所以只是用express和axios转发了请求，代码比较粗糙，也没有使用babel，所以请确保使用高版本node😋

```
$ git clone https://github.com/gaojingran/eleme-api.git
$ npm install
$ npm start
```
>前端项目

```
$ git clone https://github.com/gaojingran/react-eleme.git
$ npm install
$ npm start
```

## 效果演示
[查看demo请戳这里](http://elm.superoreo.cn)（请用chrome手机模式预览)）

<img src="http://p8uyqwmm2.bkt.clouddn.com/1526537586.png" width="250" height="250"/>

## 项目截图
<img src="http://p8uyqwmm2.bkt.clouddn.com/demo.gif" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/login.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/home.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/find.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/order.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/order-detail.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/user.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/my-address.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/update-address.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/search-address.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/shop-list.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/shop-detail.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/shop-list-1.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/shop-list-2.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/search.png" width="365" height="619"/>
<img src="http://p8uyqwmm2.bkt.clouddn.com/hongbao.png" width="365" height="619"/>

