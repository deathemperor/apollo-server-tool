const AWS = require("aws-sdk");
const path = require("path");
const slsw = require("serverless-webpack");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

async function config() {
  const secretManager = new AWS.SecretsManager({
    region: "ap-southeast-1",
  });
  const { SecretString: APPLE_SECRET } = await secretManager
    .getSecretValue({
      SecretId: "APPLE_SECRET",
    })
    .promise();
  return {
    entry: slsw.lib.entries,
    target: "node",
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    optimization: {
      minimize: false,
    },
    devtool: "source-map",
    plugins: [
      new webpack.EnvironmentPlugin({
        APPLE_SECRET,
      }),
    ],
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: [
            [
              path.resolve(__dirname, "node_modules"),
              path.resolve(__dirname, ".serverless"),
              path.resolve(__dirname, ".webpack"),
            ],
          ],
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.graphql$/i,
          use: "raw-loader",
        },
      ],
    },
    output: {
      libraryTarget: "commonjs2",
      path: path.join(__dirname, ".webpack"),
      filename: "[name].js",
      sourceMapFilename: "[file].map",
    },
    resolve: {
      extensions: [".mjs", ".json", ".ts", ".js"],
      symlinks: false,
      cacheWithContext: false,
      alias: {
        functions: path.resolve(__dirname, "functions"),
        utils: path.resolve(__dirname, "utils"),
        gql: path.resolve(__dirname, "gql"),
        middlewares: path.resolve(__dirname, "middlewares"),
      },
    },
  };
}

module.exports = config();
