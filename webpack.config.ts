import path from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

interface EnvVariables {
  mode?: 'production' | 'development';
  port?: number;
}

export default (env: EnvVariables) => {
  let config: webpack.Configuration;
  const isDev = env.mode === 'development';

  config = {
    entry: path.resolve(__dirname, 'src', 'main.ts'),
    mode: env.mode ?? 'development',
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.svg'],
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          },
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.svg$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext][query]'
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(false),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
      }),

      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico')
      })
    ],
    devtool: isDev && 'source-map',
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'dist')
      },
      hot: true
    }
  };

  return config;
};
