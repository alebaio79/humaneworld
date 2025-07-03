const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist")
    },
    open: false,
    allowedHosts: "all", // for ngrok
    devMiddleware: {
      writeToDisk: true
    }
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader", // 4. Inject CSS into DOM
          "css-loader", // 3. From css to vanilla js
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader" // 1. From SASS to CSS
        ]
      }
    ]
  }
});
