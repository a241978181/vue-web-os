// 骚年，记住吧，这是固定写法，具体请参照：
// https://www.cnblogs.com/cherishSmile/p/11091229.html
// https://juejin.im/post/5d9d386fe51d45784d3f8637#heading-1
// 使用webpack提供的方法，引入modules文件夹下所有的js后缀文件
const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default modules;
