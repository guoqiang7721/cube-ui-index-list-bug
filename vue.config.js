const webpack = require('webpack')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.(js|css|html|svg)$/, // 匹配文件名
            threshold: 10240, // 超过10K的数据进行压缩
            minRatio: 0.8,
            deleteOriginalAssets: false, // 是否删除原文件
            cache: true
          })
        ]
      }
    }
  },
  devServer: {
    compress: true,
    disableHostCheck: true, // That solved it
    port: 80,
    // allowedHosts: [
    //   'dev.zj004.cn'
    // ]
    proxy: {
      // easymock开头的请求，webpack帮你转发到target之上
      '/easymock': {
        target:
          ' https://easy-mock.com/mock/5d302f1b60c8f678e96c2d81/example_copy',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/easymock': ''
        }
      }
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'))
      .set('request', resolve('src/request'))

    config
      .plugin('context')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])

    /* 添加分析工具 */
    if (process.env.NODE_ENV !== 'development') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
        config.plugins.delete('prefetch')
      }
    }
  },
  publicPath:
    process.env.NODE_ENV !== 'production'
      ? '/'
      : 'https://zfile.bxwh002.cn/wmp_3/'
}
