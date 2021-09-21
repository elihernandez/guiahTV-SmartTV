require('esbuild').build({
	entryPoints: ['./src/index.js'],
	bundle: true,
	minify: true,
	outfile: 'build/out.js',
	target: ['chrome38']
}).catch((e) => console.log(e))