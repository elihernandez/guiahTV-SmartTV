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
		]
	]

	return {
		'compact': false,
		presets
	}
}