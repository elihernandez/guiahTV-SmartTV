module.exports = {
	'env': {
		'browser': true,
		'es2021': false,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': false
		},
		// 'ecmaVersion': 12,
		// 'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'react/prop-types': [
			'off'
		],
		'no-mixed-spaces-and-tabs': 0
	}
}
