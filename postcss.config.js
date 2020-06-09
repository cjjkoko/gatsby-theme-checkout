module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-mixins")/*({
      mixinsFiles: path.join(__dirname, "mixins", "!(*.spec.js)")
    })*/,
    require("postcss-nested"),
    require("postcss-simple-vars"),
    require("postcss-extend"),
    require('postcss-define-function'),
    // require('postcss-nested-import'),
    require("postcss-nested-vars"),
    require(`postcss-preset-env`)({ stage: 0 })
  ]
}
