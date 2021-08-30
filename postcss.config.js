module.exports = {
	plugins: [
		require('precss'),
		require('postcss-simple-extend'),
		require('postcss-sassy-mixins'),
		require('postcss-nested-vars'),
		require('postcss-nested'),
		require('postcss-import'),
		require('postcss-custom-media'),
		require('postcss-pxtorem')({
			rootValue: 10,
			unitPrecision: 5,
			propList: ['*'],
			selectorBlackList: [],
			replace: true,
			mediaQuery: false,
			minPixelValue: 0,
			exclude: /node_modules/i
		}),
		require('autoprefixer')({
			'overrideBrowserslist': ['> 1%', 'last 2 versions']
		})
	]
}