const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtract = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const RemoveStrictPlugin = require('remove-strict-webpack-plugin' )
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')

const javascriptRules = {
	test: /\.(js|jsx|ts|tsx)$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader'
	}
}

const stylesRules = {
	test: /\.css$/i,
	use: [
		MiniCSSExtract.loader,
		'css-loader',
		'postcss-loader'
	],
}

const filesRules = {
	test: /\.(webp|png|svg|jpg|gif|mp4)$/,
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: '/assets/images/'
			},
		},
	],
}

const fontsRules = {
	test: /\.(woff|woff2|eot|ttf|otf)$/,
	use: [
		{
			loader: 'url-loader',
			options: {
				name: '[name].[ext]',
				outputPath: '/assets/fonts/',
			},
		},
	],
}

const developmentPlugins = [
	new RemoveStrictPlugin()
]

const productionPlugins = [
	new RemoveStrictPlugin(),
	new CssMinimizerPlugin()
]

module.exports = (_env, { mode }) => ({
	output: {
		path: path.resolve(__dirname, 'build'),
	},
	// watch: (mode === 'production' ? false : true),
	optimization: {
		minimize:  (mode === 'production' ? true : false),
	},
	module: {
		rules: [
			javascriptRules,
			stylesRules,
			filesRules,
			fontsRules
		]
	},
	devServer: {
		compress: true,
		open: true,
		port: 9000
	},
	// devtool: 'source-map',
	plugins: [
		...(mode === 'production' ? productionPlugins : developmentPlugins),
		new HtmlWebpackPlugin({
			favicon: 'src/assets/images/logos/guiahtv/favicon.ico',
			title: 'Guíah TV | Un espacio de fe',
			template: 'src/index.html'
		}),
		new MiniCSSExtract({
			filename: '[name].min.css',
			chunkFilename: '[name].chunk.min.css',
		}),
	].filter(Boolean)
})