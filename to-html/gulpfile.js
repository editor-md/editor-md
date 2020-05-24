const { src, dest, series, parallel } = require('gulp');
const htmlmin = require('gulp-html-minifier');
const concat = require('gulp-concat');
const cssmin = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const order = require("gulp-order");
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cached = require('gulp-cached');


function copy() {
	return src("../build/**/*")
	.pipe(dest("./Editor.md"));	
}

function del() {
	return src('./dist', { read: false})
		.pipe(clean());
}

function svg() {
	return src('Editor.md/lib/clippy.svg')
		.pipe(dest('./dist/Editor.md/lib'))
}

function css() {
	return src(['Editor.md/css/editormd.preview.min.css'])
		.pipe(cssmin())
		.pipe(concat('main.min.css'))
		.pipe(dest('./dist/css'))
};

function html() {
	return src('./out.html')
		.pipe(htmlmin({
			removeComments: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			removeEmptyAttributes: true,
			collapseBooleanAttributes: true,
			collapseWhitespace: true,
			minifyJS: true,
			minifyCSS: true
		}))
		.pipe(concat('index.html'))
		.pipe(dest('./dist'))
}

function js() {
  return src(['Editor.md/js/plugins.min.js'], { sourcemaps: false })
	.pipe(concat('main.min.js'))
    .pipe(dest('./dist/js', { sourcemaps: false }))
}

function img() {
	return src("./img/*")
		.pipe(cached(imagemin({
			optimizationLevel: 3,
            progressive: true,
			interlaced: true,
			use: [pngquant()]
		})))
		.pipe(dest('./dist/img'))
}

exports.del= del;
exports.js = js;
exports.css = css;
exports.html = html;
exports.svg = svg;
exports.img = img;
exports.copy = copy;
exports.default = series(copy, del, parallel(css, html, js, svg, img));