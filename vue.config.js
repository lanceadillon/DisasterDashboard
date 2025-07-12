 /**
 * @file vue.config.js
 * @author Lance Dillon
 * @description This file configures the Vue CLI service for the project.
 * It sets up options for transpilation, public path for production builds,
 * and development server settings, including the host, port, and static file directory.
 * It also customizes the HTMLWebpackPlugin to use a specific template and set the page title.
 *
 * @requires @vue/cli-service - Vue CLI service for project configuration.
 */
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-base-path/'
    : '/',
  devServer: {
    // Ensure the host and port match the setup if different from defaults
    host: 'localhost',
    port: 8080,
    static: {
      directory: './public', // Path to the public folder relative to project root
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
  //configure the template for html-webpack-plugin
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = './public/index.html'; // Explicitly set the template path
        args[0].title = 'Disaster Social Media Dashboard'; // Set a default title
        return args;
      });
  }
});