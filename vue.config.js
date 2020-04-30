// Config Reference: https://cli.vuejs.org/zh/config/
// 编译文件可视化工具
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
// 引入颜色值批量替换模块
const ThemeColorReplacer = require("webpack-theme-color-replacer");
const forElementUI = require("webpack-theme-color-replacer/forElementUI");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "http://49.233.186.140/" : "/",
  productionSourceMap: false,
  devServer: {
	openPage:'#/signin',
    port: 8080, // 配置端口号

  },
  configureWebpack: config => {
    // 如果带有 --report 就开启可视化服务
    if (
      process.env.NODE_ENV === "production" &&
      process.env.npm_config_report
    ) {
      return {
        plugins: [new BundleAnalyzerPlugin()]
      };
    } else {
      // 为开发环境修改配置...
      return {
        plugins: [
          //生成仅包含颜色的替换样式（主题色等）
          new ThemeColorReplacer({
            // 官网的文件名，会导致编译后的文件名不对：fileName: 'css/theme-colors-[contenthash:8].css'
            // 不要添加 [contenthash:8]
            fileName: "css/theme-colors.css",
            matchColors: [...forElementUI.getElementUISeries("#7367f0")], //需要替换的颜色数组，里面都是目标颜色
            changeSelector: forElementUI.changeSelector
          })
        ]
      };
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      //   sass: {
      // @/ 是 src/ 的别名
      // 所以这里假设你有 `src/variables.sass` 这个文件
      // 注意：在 sass-loader v7 中，这个选项名是 "data"
      // prependData: `@import "~@/variables.sass"`
      //   },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "~@/assets/scss/global.scss";`
      }
    }
  }
};
