# 猎诚基金
## 使用
### git flow
**所有人在develop分支上开发及提交**


1.打开终端，进入到你的workspace，运行下列代码clone到本地：
```
git clone git@112.74.201.90:liechengcf/fund-vue.git
```

2.签出开发分支：
```
git checkout develop
```

3.提交更改：
```
git commit -m "your comment about check-in"
```

4.推送提交：
```
git push
```


### 本地开发 

1.进入项目根目录，安装依赖：
```
npm install
```

2.开启调试：
调用局域网 `api.liechengcf.net` 接口：
```
npm run dev
```

或者调用本地 `api.liechengcf.me` 接口：
```
npm run dev:local
```

*组件说明举例见`http://localhost:8100/components`*

### 相关规范

- 一个缩进使用4个空格，而不是Tab
- 组件class不设独立作用域，md_前缀为公共，各页面带各自前缀
- 前缀规则为英文单词各音节首字母，如fundDetail为fd_
- 文件命名统一用驼锋，class命名用下划线


## 发布
预发环境：
```
npm run build:pre
```

生产环境：
```
npm run build:prod
```


## 前端开发注意
### 已知问题
- 当页面使用了 `keep-alive` ，子路由的 `transition` 会失效，在 `router.js` 中去掉 `keepAlive:true` 即可
- 使用了 `keep-alive` 时，infinite-loading 插件无法在 `activited` 时自动发起请求，需在 `activited` 中手动请求第一页
