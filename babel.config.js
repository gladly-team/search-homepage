var useLooseMode = false
module.exports = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['> 0.5%, last 2 versions, not dead, not IE 11'],
        },
      },
    ],
  ],
  plugins: [
    // https://github.com/babel/babel/issues/11622#issuecomment-644141879
    ['@babel/plugin-proposal-class-properties', { loose: useLooseMode }],
    ['@babel/plugin-proposal-private-methods', { loose: useLooseMode }],
    [
      '@babel/plugin-proposal-private-property-in-object',
      { loose: useLooseMode },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          src: './src/',
        },
      },
    ],
  ],
}
