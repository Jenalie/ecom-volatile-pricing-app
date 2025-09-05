module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // instead of just `tailwindcss`
    require('autoprefixer'),
  ],
}
