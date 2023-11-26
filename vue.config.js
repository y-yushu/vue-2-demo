const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置代理
  devServer: {
    port: 8080, // 设置开发服务器的端口号，默认是8080
    host: '127.0.0.1', // 设置开发服务器的主机，可以是 IP 地址或 localhost
    https: false, // 是否使用 https
    open: false, // 是否在启动服务后自动打开浏览器
    hot: true, // 是否开启热更新，即局部刷新
    proxy: {
      '/api': {
        target: `https://mcc.3xmt.com/gateway`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
