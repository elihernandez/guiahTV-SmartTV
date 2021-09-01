const polyfillLibrary = require('polyfill-library')

const polyfillBundle = polyfillLibrary.getPolyfillString({
	uaString: 'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) QtWebEngine/5.2.1 Chrome/38.0.2125.122 Safari/537.36 WebAppManager',
	minify: true,
	features: {
		'es5': { flags: ['gated'] }
	}
}).then(function(bundleString) {
	console.log(bundleString)
})