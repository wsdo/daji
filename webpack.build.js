const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          postcssFlexbugsFixes,
          postcssPresetEnv({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
        ],
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: false,
      },
    });
  }
  return loaders;
};

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: 'ReactDOM',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl$/,
        // loader: 'style-loader!css-loader!stylus-loader',
        use: getStyleLoaders(
          {
            importLoaders: 2,
            modules: true,
            // getLocalIdent: getCSSModuleLocalIdent,
          },
          'stylus-loader',
        ),
      },
      // {
      //   test: /\.styl/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: { importLoaders: 1 },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         plugins: [
      //           // autoprefixer({
      //           //   browsers: ['> 1%', 'IE 7'],
      //           // }),
      //         ],
      //       },
      //     },
      //     {
      //       loader: 'stylus-loader',
      //       options: {
      //         paths: [path.resolve(__dirname, 'src')],
      //       },
      //     },
      //   ],
      //   include: [path.resolve(__dirname, 'src')],
      // },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
