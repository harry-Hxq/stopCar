// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'pre'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.pre.conf')

var spinner = ora('building for pre...')
spinner.start()

var assetsPath = path.join(config.pre.assetsRoot, config.pre.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})