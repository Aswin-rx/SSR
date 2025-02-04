const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = [
  {
    // Client-side configuration
    mode: "development",
    entry: "./src/index.client.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"], // CSS processing for client-side
        },
      ],
    },
  },
  {
    // Server-side configuration
    mode: "development",
    target: "node",
    externals: [nodeExternals()],
    entry: "./src/index.server.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "server.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/i,
          use: "ignore-loader", // Ignores CSS in SSR build
        },
      ],
    },
  },
];
