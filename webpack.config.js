const webpack = require("webpack")
const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const NODE_ENV = process.env.NODE_ENV || "development"
const isDevEnv = NODE_ENV === "development"
const sourceDir = path.resolve(__dirname, "src")

const config = {
  entry: {
    app: "./src/app.js",
    client: "./src/assets/js",
    styles: "./src/assets/styles/main.scss"
  },
  output: {
    filename: '[name].js',
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: isDevEnv,
    port: 3000,
    stats: "minimal",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './dist/assets/images/',
              useRelativePath: true,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: sourceDir,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "images/[name].[ext]"
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: sourceDir,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "fonts/[name].[ext]"
          }
        }
      },
      {
        test: /\.js$/,
        include: sourceDir,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        include: sourceDir,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "resolve-url-loader",
            "postcss-loader?sourceMap=true",
            "sass-loader?sourceMap=true"
          ]
        })
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.ProvidePlugin({
      React: "react",
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new ExtractTextPlugin({
      filename: './assets/styles/[name].css',
      disable: isDevEnv
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/images', to: './assets/images'
      },
      {
        from:'./src/assets/js', to: './assets/js'
      }
    ])
  ]
}

let components = []
const COMPONENTS_PATH = "./src/components/"

fs.readdirSync(COMPONENTS_PATH).forEach(file => {
  const fileWithoutExt = file.split('.')[0]
  const path = `/components/${fileWithoutExt}`
  const filename = `components/${fileWithoutExt}/index.html`

  components.push({
    path,
    filename,
    title: fileWithoutExt
  })
})

for (let component of components) {
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      filename: component.filename,
      template: "./src/templates/main.ejs",
      title: component.title,
      isDevEnv: isDevEnv
    })
  )
}

let views = []
const VIEWS_PATH = "./src/views/"

fs.readdirSync(VIEWS_PATH).forEach(file => {
  const fileWithoutExt = file.split('.')[0]
  const isDirectory = fileWithoutExt === 'index'
  const path = isDirectory ? '/' : `/views/${fileWithoutExt}`
  const filename = isDirectory ? 'index.html' : `views/${fileWithoutExt}/index.html`

  views.push({
    path,
    filename,
    title: fileWithoutExt
  })
})

for (let view of views) {
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      filename: view.filename,
      template: "./src/templates/main.ejs",
      title: view.title,
      isDevEnv: isDevEnv
    })
  )
}

if (isDevEnv) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

if (!isDevEnv) {
  config.plugins.push(new UglifyJSPlugin({ sourceMap: true }))
}

module.exports = config
