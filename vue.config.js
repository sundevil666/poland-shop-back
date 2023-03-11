module.exports = {
  publicPath: '/poland-shop-back',
  chainWebpack: config => {
    config
      .plugin('copy')
      .tap(args => {
        args[0].push({
          from: 'public/.htaccess',
          to: ''
        })
        return args
      })
  }
}
