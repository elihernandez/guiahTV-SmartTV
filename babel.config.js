module.exports = function(api) {
	api.cache(true)
	api.assertVersion('^7.4.5')

	const presets = [
		[
			'@babel/preset-env',
			{
				// 'useBuiltIns': 'usage',
				// 'corejs': '3.6.4',
				'modules': 'auto',
				// 'forceAllTransforms': true,
				'targets': {
					chrome: '28',
				},
				// 'useBuiltIns': 'usage',
			}
		],
		[
			'@babel/preset-react',
			{
				runtime: 'automatic'
			}
		],
		// ['minify', { builtIns: false }]
	]

	const plugins = [
		'transform-remove-strict-mode',
		// ['@babel/transform-runtime',
		// 	{
		// 		'regenerator': true
		// 	}
		// ],
		'@babel/plugin-transform-async-to-generator',
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-transform-react-constant-elements',
		'@babel/plugin-transform-react-inline-elements',
		'@babel/plugin-proposal-export-default-from'
		// ['@babel/plugin-transform-modules-commonjs', {
		//   'strictMode': false
		// }],
	]

	return {
		'compact': false,
		presets,
		plugins
	}
}