/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-10 14:44:52
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-10 16:45:35
 * @FilePath: \vue-module-demo\vue.config.js
 * @Description: 项目配置
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7000,
  },
});
