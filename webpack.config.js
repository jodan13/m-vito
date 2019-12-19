const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 4200
  },

  plugins: [
    new HTMLPlugin({
      filename: "index.html",
      template: "./src/index.html",
      favicon: "src/img/favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.(html)$/,
        use: "html-loader"
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]",
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js"]
  }
};
