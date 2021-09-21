module.exports = function(api) {
	api.cache(true)
	api.assertVersion('^7.4.5')

	const presets = [
		[
			'@babel/preset-env',
			{
				'modules': 'auto',
				'targets': {
					chrome: '28',
				},
			}
		],
		// [
		// 	'@babel/preset-react',
		// 	{
		// 		runtime: 'automatic'
		// 	}
		// ]
		'solid'
	]

	const plugins = [
		// 'transform-remove-strict-mode',
		// '@babel/plugin-transform-async-to-generator',
		// '@babel/plugin-proposal-optional-chaining',
		// '@babel/plugin-transform-react-constant-elements',
		// '@babel/plugin-transform-react-inline-elements',
		// '@babel/plugin-proposal-export-default-from'
	]

	return {
		'compact': false,
		presets,
		plugins
	}
}