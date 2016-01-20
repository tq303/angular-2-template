/**
* Created by Oliver #FFF 18/1/2016
* relies on NODE_ENV
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
gulp.task('copy',  ['font-awesome']);

// Build Types
gulp.task('build:development', ['build', 'copy', 'tsconfig-glob', 'hbs-index', 'typescript', 'watch']);

// component tasks

// font-awesome
gulp.task('font-awesome', function () {
    gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
});

// Clean
gulp.task('clean', function () {

    mkdirp.sync('./dist');
    mkdirp.sync('./dist/js');
    mkdirp.sync('./dist/css');
    mkdirp.sync('./dist/fonts');
    mkdirp.sync('./dist/templates');

    return del([
        './dist/fonts/*',
        './src/**/*.js',
        './dist/**/*.js',
        './dist/**/*.css',
        './dist/**/*.map',
        './dist/**/*.html',
    ]);

});

// ng-templates
gulp.task('ng-templates', function () {
    gulp.src('./src/templates/**/*.html')
        .pipe(livereload())
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
gulp.task('typescript', function () {
    gulp.src('src/ts/**/*.ts')
        .pipe(plumber())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(livereload())
        .pipe(gulp.dest('.'));
});

gulp.task('tslint', function() {
    gulp.src('app/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('tsconfig-glob', function () {
    // return tsFileGlob({
    //     configPath: '.',
    //     indent: 2
    // });
});

// Handlebars
gulp.task('hbs-index', function () {
    var opts = {
        ignorePartials: true,
        partials : {},
        batch : [],
        helpers : {}
    },
    data = {
        isProduction: (process.env.NODE_ENV === 'production')
    };

    gulp.src('./src/index.html')
        .pipe(plumber())
        .pipe(handlebars(data, opts))
        .pipe(livereload())
        .pipe(gulp.dest('./dist'));
});

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
    gulp.watch(['./src/ts/**/*.ts'],  ['tsconfig-glob', 'typescript']);
    gulp.watch(['./src/**/*.html'],  ['ng-templates', 'hbs-index']);
});
