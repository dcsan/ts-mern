const fs = require("fs");
const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

const nodeModules = {};
fs.readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  entry: "./server/server.ts",
  externals: nodeModules,

  module: {
    loaders: [
      {
        loader: "ts-loader",
        test: /\.tsx?$/,
      },
    ],
  },
  output: {
    filename: "server.js",
    path: path.join(__dirname, "/build"),
  },
  plugins: [new NodemonPlugin()],
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  target: "node",
};
