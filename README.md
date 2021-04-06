# mini-cloud-music

## 从零开始搭建和维护仿网易云项目

### 搭建react项目

1. npm init
2. npm install webpack webpack-cli -D, 配置webpack.config.js
3. npm install babel-loader @babel/core @babel/cli @babel/preset-env -D
        1. babel-loader babel转换的loader
        2. @babel/core babel的核心功能
        3. @babel/cli 提供babel的核心命令
        4. @babel/preset-env 对浏览器中缺失的功能进行代码转换并加载polyfill, 提供参数usage，就只会包含polyfill，必须同时配置corejs
        5. yarn add core-js regenerator-runtime 搭建完整的es2015环境，可以使用Promise, Map等语法
4. yarn add sass-loader dart-sass css-loader style-loader file-loader 
5. yarn add html-webpack-plugin
6. yarn add webpack-dev-server
7. yarn add react react-dom react-router-dom react-router-config react-router
8. yarn add @babel/preset-react
9. yarn add @types/react @types/react-dom @types/react-router-dom typescript @babel/preset-typescript
10. yarn add mini-css-extract-plugin
11. yarn add cssnano optimize-css-assets-webpack-plugin
12. yarn add postcss-loader
13. yarn add clean-webpack-plugin
14. yarn add progress-bar-webpack-plugin chalk
15. yarn add styled-components
16. yarn add redux redux-thunk redux-immutable react-redux immutable

### 项目添加eslint

1. yarn add eslint
2. npx eslint --init

