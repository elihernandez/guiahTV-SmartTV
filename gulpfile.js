const { watch, parallel, src, dest  } = require('gulp')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const minifycss = require('gulp-minify-css')
const swc = require('gulp-swc')
// const autoprefixer = require('gulp-autoprefixer')
// const sass = require('gulp-sass')
const postcss = require('gulp-postcss')

function dist(cb) {
	src([
		'src/js/dist/axios.js',
		// 'src/js/dist/hls.js',
		'src/js/dist/jquery.js',
		// 'src/js/dist/popper.js',
		'src/js/dist/bootstrap.js',
		'src/js/dist/js-cookie.js',
		// 'src/js/dist/bowser.js',
		'src/js/dist/moment.js',
		'src/js/dist/moment-timezone-with-data.js',
		'src/js/dist/spatial-navigation.js',
		'src/js/dist/transition.js',
		'src/js/dist/uuidv4.js',
		'src/webOSTVjs-1.2.3/webOSTV-dev.js',
		'src/webOSTVjs-1.2.3/webOSTV.js',
		'src/js/dist/react.js',	
		'src/js/dist/react-dom.js',
		'src/js/dist/slick.js',
		'src/js/dist/store.js'
	])
		.pipe(concat('dist.js'))
		.pipe(dest('output/'))
	cb()
}

function lib(cb) {
	src([
		'src/js/lib/*.js',
	])
		.pipe(concat('lib.js'))
		.pipe(dest('output/'))
	cb()
}

function classes(cb) {
	src([
		'src/js/classes/*.js'
	])
		.pipe(concat('classes.js'))
		.pipe(dest('output/'))
	cb()
}

function renders(cb) {
	src([
		'src/js/renders/**/*.js'
	])
		.pipe(concat('renders.js'))
		.pipe(dest('output/'))
	cb()
}

function sections(cb) {
	src([
		'src/js/sections/*.js',
		'src/js/services/**/*.js'
	])
		.pipe(concat('sections.js'))
		.pipe(dest('output/'))
	cb()
}

function app(cb) {
	src([
		'src/js/app.js'
	])
		.pipe(concat('app.js'))
		.pipe(dest('output/'))
	cb()
}

function build(cb) {
	src([
		// 'src/js/dist/bcrypt.js',
		'src/js/lib/polyfill/*.js',
		'output/dist.js',
		'output/lib.js',
		'output/renders.js',
		'output/sections.js',
		'output/classes.js',
		'output/app.js'
	])
		.pipe(babel().on('error', function(error){
			console.log(error)
		}))
		// .pipe(swc().on('error', function(error){
		// 	console.log(error)
		// }))
		.pipe(concat('build.js'))
		.pipe(dest('output/'))
		.on('end', () => cb())
}

function dev(cb) {
	src([
		'src/js/dist/hls.js',
		'src/js/dist/bcrypt.js',
		'output/build.js'
	])
		.pipe(concat('build.js'))
		.pipe(dest('webOS/app/'))
		.on('end', () => cb())
}

function prod(cb) {
	src([
		'src/js/dist/hls.js',
		'src/js/dist/bcrypt.js',
		'output/build.js'
	])
		.pipe(concat('build.js'))
		.pipe(uglify())
		.pipe(dest('webOS/app/'))
		.on('end', () => cb())
}

function css(cb) {
	src('src/css/**/*.css')
		.pipe(concat('build.css'))
		.pipe(postcss())
		.pipe(minifycss())
		.pipe(dest('webOS/app/'))
	cb()
}

exports.concat = parallel(dist, lib, renders, classes, sections, app)
exports.build = build
exports.dev = dev
exports.prod = prod
exports.css = css 

exports.watch = function() {
	watch('src/**/*.js', parallel(dist, lib, renders, classes, sections, app))
	watch([
		'output/dist.js',
		'output/lib.js',
		'output/renders.js',
		'output/sections.js',
		'output/classes.js',
		'output/app.js'
	], build)
	watch([
		'output/build.js'
	], dev)
	watch('src/css/**/*.css', css)
}