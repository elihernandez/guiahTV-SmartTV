module.exports = function(api) {
	api.cache(true)
	api.assertVersion('^7.4.5')

	const presets = [
		'solid',
		[
			'@babel/preset-env',
			{
				'targets': {
					chrome: '38',
				},
			}
		],
		// [
		// 	'@babel/preset-react',
		// 	{
		// 		runtime: 'automatic'
		// 	}
		// ]
	]

	const plugins = [
		// 'transform-remove-strict-mode',
		// '@babel/plugin-transform-async-to-generator',
		// '@babel/plugin-proposal-optional-chaining'
		// '@babel/plugin-transform-arrow-functions'
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