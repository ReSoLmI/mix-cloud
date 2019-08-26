'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

const name = defaultSettings.title || 'LStackHybrid'
// 如果希望指定端口为80,需要使用管理员权限执行命令,比如,Mac: sudo npm run
const devPort = 8080

function resolve(dir) {
    return path.join(__dirname, dir)
}
//所有配置项可在Vue Cli文档中找到 https://cli.vuejs.org/config/
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: devPort,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/Cluster': {
                // target: `http://8.16.0.153:3000`,
                target: `http://8.11.0.48:8080`,
                changeOrigin: true,
                pathRewrite: {
                    '^/Cluster': ''
                }
            },
        },
        // after: require('./mock/mock-server.js')
    },
    configureWebpack: {
        name: name,//网站标题
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
};
