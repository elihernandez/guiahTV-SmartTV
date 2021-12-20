const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtract = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const RemoveStrictPlugin = require('remove-strict-webpack-plugin' )

const javascriptRules = {
	test: /\.(js|jsx|ts|tsx)$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: [
				'@babel/preset-react',
				[
					'@babel/preset-env',
					{
						'useBuiltIns': 'entry',
						'targets': {
							chrome: 18
						},
						'modules': false,
						'forceAllTransforms': true
					}
				],
				['minify', { builtIns: false }]
				
			],
			plugins: [
				'@babel/transform-runtime',
				'@babel/plugin-proposal-optional-chaining',
				'@babel/plugin-transform-react-constant-elements',
				'@babel/plugin-transform-react-inline-elements',
				['@babel/plugin-transform-modules-commonjs', {
					'strictMode': false
				}],
			]
		}
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
	new CssMinimizerPlugin(),
	new RemoveStrictPlugin(),
]

const productionPlugins = [
	new RemoveStrictPlugin(),
	new CleanWebpackPlugin(),
	new CompressionPlugin(),
	new CssMinimizerPlugin(),
]

module.exports = (_env, { mode }) => ({
	entry: './src/js/app.js',
	output: {
		path: path.resolve(process.cwd(), __dirname + '/build'),
		publicPath: 'app/',
	},
	watch: (mode === 'production' ? false : true),
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
		historyApiFallback: false
	},
	plugins: [
		...(mode === 'production' ? productionPlugins : developmentPlugins),
		new HtmlWebpackPlugin({
			favicon: './src/assets/images/logos/guiahtv/favicon.ico',
			title: 'Guíah TV | Un espacio de fe',
			template: './src/index.html',
			filename: '../index.html',
		}),
		new MiniCSSExtract({
			filename: '[name].min.css',
			chunkFilename: '[name].chunk.min.css',
		}),
	].filter(Boolean)
})