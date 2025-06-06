const { rspack } = require('@rspack/core');
const { VueLoaderPlugin } = require('vue-loader');

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: './src/main.tsx',
  },
  experiments: {
    css: true,
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]],
              plugins: ['@vue/babel-plugin-jsx'],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
};
module.exports = config;
