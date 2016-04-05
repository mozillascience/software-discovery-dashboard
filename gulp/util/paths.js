export default {
  build: {
    public: {
      html: './dist/public',
      stylesheets: './dist/public/stylesheets',
      javascripts: './dist/public/javascripts',
      images: './dist/public/images'
    },
    server: './dist/lib'
  },

  source: {
    public: {
      html: './public/*.html',
      stylesheets: './public/stylesheets/**/*.scss',
      javascripts: './public/javascripts/**/*.js',
      jsxMain: './public/javascripts/app.jsx',
      images: './public/images/**/*'
    },
    server: './lib/**/*.js',
    tests: './spec/**/*[sS]pec.js'
  }
}
