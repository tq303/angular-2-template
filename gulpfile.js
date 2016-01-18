/**
* Created by Oliver #FFF 18/1/2016
*/

// Modules
const gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      concat        = require('gulp-concat'),
      sourcemaps    = require('gulp-sourcemaps'),
      livereload    = require('gulp-livereload'),
      typescript    = require('gulp-typescript'),
      plumber       = require('gulp-plumber'),
	  handlebars    = require('gulp-compile-handlebars'),
      tsFileGlob    = require('tsconfig-glob'),
      webpack       = require('webpack-stream'),
      del           = require('del'),
      mkdirp        = require('mkdirp'),
      child_process = require('child_process'),
	  path 			= require('path');

// typescript config
const tsconfig = require('./tsconfig');

// Build Essentials
gulp.task('build', ['clean', 'link', 'scss', 'ng-templates']);

// Build Types
gulp.task('build:development', ['build', 'tsconfig-glob', 'hbs-index:dev', 'typescript:dev']);

// Clean
gulp.task('clean', function () {

	mkdirp.sync('./dist');
	mkdirp.sync('./dist/js');
	mkdirp.sync('./dist/css');
	mkdirp.sync('./dist/fonts');
    mkdirp.sync('./dist/templates');

	return del([
		'./dist/**/*.js',
		'./dist/**/*.css',
        './dist/**/*.html',
        './dist/**/*.map',
	]);

});

// ng-templates
gulp.task('ng-templates', function () {
    gulp.src('./src/templates/**/*.html')
        .pipe(gulp.dest('./dist/templates'))
});

// Link Bower folder
gulp.task('link', function () {
	// var node_modules = 'node_modules',
    //     files = [''];
    //
	// try {
	// 	child_process.execSync(['ln -s', path.join(__dirname, node_modules), __dirname + '/dist/node_modules'].join(' '));
	// } catch(e) {
    //
	// }
});

// TypeScript
gulp.task('typescript:dev', function () {
    gulp.src('src/ts/**/*.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('.'));
});

gulp.task('tslint', function() {
	gulp.src('app/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
});

gulp.task('tsconfig-glob', function () {
  return tsFileGlob({
    configPath: '.',
    indent: 2
  });
});

// Handlebars
gulp.task('hbs-index:dev', function () {

	return complileHBS({
		isProduction: false
	});

});

function complileHBS(tData) {

	var opts = {
		ignorePartials: true,
		partials : {},
		batch : [],
		helpers : {}
	};

	return gulp.src('./src/index.html').pipe(handlebars(tData, opts)).pipe(gulp.dest('./dist'));
}

// SCSS
gulp.task('scss', function () {
	gulp.src('./src/scss/main.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(livereload())
		.pipe(gulp.dest('./dist/css'));
});

// watch
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(['./src/scss/**/*.scss'],  ['scss']);
    gulp.watch(['./src/ts/**/*.ts'],  ['tsconfig-glob', 'typescript:dev']);
    // gulp.watch(['./src/index.html'],  ['tsconfig-glob', 'typescript:dev']);
});
