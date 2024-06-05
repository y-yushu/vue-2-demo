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
  // pwa: {
  //   name: '地图工具',
  //   themeColor: 'red',
  //   appleMobileWebAppCapable: true,
  //   // manifest 设置
  //   manifestOptions: {
  //     name: '地图工具',
  //     short_name: '地图工具',
  //     theme_color: 'white',
  //     start_url: '.',
  //     display: 'standalone',
  //     background_color: 'white',
  //     icons: [
  //       {
  //         src: 'favicon.png', // 这里的图片地址对应 /public 目录中的图片地址
  //         sizes: '512x512',
  //         type: 'image/png',
  //         purpose: 'any'
  //       }
  //     ]
  //   },
  //   // 图标
  //   iconPaths: {
  //     // 这里是项目外的路径，对应 public 目录
  //     favicon32: 'favicon.png', // 这里的图片地址对应 /public 目录中的图片地址
  //     favicon16: 'favicon.png', // 这里的图片地址对应 /public 目录中的图片地址
  //     maskIcon: null,
  //     msTileImage: null
  //   }
  // }
})
