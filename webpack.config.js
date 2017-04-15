var path = require('path');

module.exports = {
  entry: './frontjs/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js')
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};