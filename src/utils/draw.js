/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-10 17:26:56
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-10 17:48:08
 * @FilePath: \vue-module-demo\src\utils\draw.js
 * @Description: 获取图形
 */
import mergeImages from "merge-images";
/**
 * 获取图标Base64
 * @param {String} color 背景色
 * @param {ImageData} icon 图标
 * @param {Object} option 配置
 * @returns
 */
const getSymbol = (color = "#fff799", icon, option) => {
  return new Promise((callback) => {
    let size = 64;
    if (option && option.size) size = option.size;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.beginPath(); //开始绘制
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI); // arc 的意思是“弧”
    ctx.fillStyle = color; // 设置填充颜色
    ctx.fill(); // 开始填充
    // 设置边框颜色
    if (option && option.border) {
      ctx.strokeStyle = option.border;
      ctx.stroke();
    }
    // 获取背景
    const back = canvas.toDataURL("image/png");
    // 搓合图片
    mergeImages([back, icon]).then((b64) => {
      callback(b64);
    });
  });
};

export { getSymbol };
