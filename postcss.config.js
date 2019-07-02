const isProduction = process.env.NODE_ENV === 'production'

class TailwindExtractor {
  static extract (content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

const purgecssConfig = {
  content: ['./frontend/**/*.html', './frontend/**/*.vue'],
  whitelist: ['body', 'html'],
  whitelistPatterns: [],
  whitelistPatternsChildren: [],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ['html', 'js', 'vue'],
    },
  ],
}

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('precss')({
      autoprefixer: { grid: true },
      features: {
        'nesting-rules': true,
      },
    }),
    require('tailwindcss')('tailwind.config.js'),
    isProduction ? require('@fullhuman/postcss-purgecss')(purgecssConfig) : '',
  ],
}
