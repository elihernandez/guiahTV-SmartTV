// {
//   "presets": [
//     [
//       "env",
//       {
//         "targets": {
//           "chrome": "38"
//         }
//       }
//     ],
//     "@babel/preset-react"
//   ],
//   "plugins": [
//     '@babel/transform-runtime',
//     '@babel/plugin-proposal-optional-chaining',
//     '@babel/plugin-transform-react-constant-elements',
//     '@babel/plugin-transform-react-inline-elements',
//     ['@babel/plugin-transform-modules-commonjs', {
//       'strictMode': false
//     }],
//   ]
// }

module.exports = function(api) {
  api.cache(true)
  api.assertVersion("^7.4.5")

  const presets = [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry',
        // 'corejs': '3.6.4',
        'modules': false,
        // 'forceAllTransforms': true,
        'targets': {
          chrome: '28',
        },
        // 'useBuiltIns': 'usage',
      }
    ],
    '@babel/preset-react'
    // ['minify', { builtIns: false }]
  ]

  const plugins = [
    // '@babel/transform-runtime',
    'transform-remove-strict-mode',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements',
    // ['@babel/plugin-transform-modules-commonjs', {
    //   'strictMode': false
    // }],
  ]

  return {
    "compact": false,
    presets,
    plugins
  }
}