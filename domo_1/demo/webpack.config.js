const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = {
  entry: {},
  output:{
    path:path.resolve(__dirname, './dist/'),
    filename:'[name].[chunkhash:6].js'
  },
  //设置开发者工具的端口号,不设置则默认为8080端口
  devServer: {
    inline: true,
    port: 8181,
    historyApiFallback: true,
  },
  module:{
    loaders:[
      // test参数用来指示当前配置针对哪些资源，当参数匹配时，就会使用响应的loader
      // exclude参数用来剔除需要忽略的资源
      // include参数用来表示本loader配置仅针对哪些目录/文件
      // loader/loaders
      {
        test:/\.js?$/,             //.js文件进行处理
        exclude:/node_modules/,    //除开node_modules下的文件，因为这些文件不需要检查
        loader:'babel-loader',
        query:{
          presets:['es2015','react','stage-0']    //presets字段设置转码规则
        }
      },
      {
        test: /\.(scss|sass|css)$/, 
        loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})//use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
                                                                                          //fallback:编译后用什么loader来提取css文件
      },
    ]
  },
  plugins: [       //插件
    new ExtractTextPlugin("[name].[chunkhash:6].css"),
    new CleanWebpackPlugin(
      ['dist'],　 
      {
        root: __dirname,    　　　　　　　　　　
        verbose: true,    　　
        // Use boolean "true" to test/emulate delete. (will not remove files).
        // Default: false - remove files　　　　　　　　
        dry:   false    　
        // If true, remove files on recompile. 
        // Default: false　　　　　　　　　
      }
    )
  ],
};
// 获取指定路径下的入口文件
function getEntries(globPath) {
  const files = glob.sync(globPath),
   entries = {};
  files.forEach(function(filepath) {
    const split = filepath.split('/');
    const name = split[split.length - 2];
    entries[name] = './' + filepath;
  });
  return entries;
}

const entries = getEntries('src/index/index.js');
Object.keys(entries).forEach(function(name) {
  webpackConfig.entry[name] = entries[name];
  const plugin = new HtmlWebpackPlugin({
    filename: name + '.html',
    template: './public/app1.html',
    inject: true,
    chunks: [name]
  });
  webpackConfig.plugins.push(plugin);
})
module.exports = webpackConfig;