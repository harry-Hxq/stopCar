// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: {
            NODE_ENV: '"prod"'
        },
        index: path.resolve(__dirname, '../erp/index.html'),
        assetsRoot: path.resolve(__dirname, '../erp'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        deploy: {
            host: '39.108.110.77',
            port: '22',
            username: 'root',
            password: 'wW17876013413.',//or use privateKey login(privateKey: require('fs').readFileSync('/path/to/private/key')).
            cover: 'false',
            from: './erp',
            to: '/web/stopCar',//important: If the 'cover' of value is false,All files in this folder will be cleared before starting deployment.
        }
    },
    pre: {
        env: {
            NODE_ENV: '"pre"'
        },
        index: path.resolve(__dirname, '../erp/index.html'),
        assetsRoot: path.resolve(__dirname, '../erp'),
        assetsSubDirectory: '/',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        deploy: {
            host: '39.108.110.77',
            port: '22',
            username: 'root',
            password: 'wW17876013413.',//or use privateKey login(privateKey: require('fs').readFileSync('/path/to/private/key')).
            cover: 'false',
            from: './erp',
            to: '/web/stopCar',//important: If the 'cover' of value is false,All files in this folder will be cleared before starting deployment.
        }
    },
    local: {
        env: {
            NODE_ENV: '"local"'
        },
        port: 8300,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        context: [ //代理路径
            '/api/v1/user',
        ],
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: true
    },
    dev: {
        env: {
            NODE_ENV: '"dev"'
        },
        port: 8300,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        context: [ //代理路径
            '/api/v1/user',
        ],
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: true
    }
}