const webpack = require("skripts/config").webpack(require("serverless-webpack"))

module.exports = {
  ...webpack,
  optimization: {
    concatenateModules: false,
  },
}
