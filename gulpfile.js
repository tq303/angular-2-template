/**
  * Created by Oliver #FFF 18/1/2016
  */

'use strict';

// Modules
const gulp          = require('gulp'),
      seq           = require('gulp-sequence'),
      sass          = require('gulp-sass'),
      concat        = require('gulp-concat'),
      sourcemaps    = require('gulp-sourcemaps'),
      livereload    = require('gulp-livereload'),
      typescript    = require('gulp-typescript'),
      plumber       = require('gulp-plumber'),
      handlebars    = require('gulp-compile-handlebars'),
      rename        = require('gulp-rename'),
      tsFileGlob    = require('tsconfig-glob'),
      del           = require('del'),
      mkdirp        = require('mkdirp'),
      child_process = require('child_process'),
      path 			= require('path'),
      fs 			= require('fs');

// typescript config
const tsconfig = require('./tsconfig');

// vendor files used
let vendorScripts = [
    'node_modules/es6-shim/es6-shim.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.js',
    'node_modules/angular2/bundles/http.js',
    'node_modules/angular2/bundles/router.js'
];

// Build Essentials
gulp.task('build', seq('clean', 'scss', 'ng-templates'));
gulp.task('link',  seq(['link-font-awesome', 'link-js']));

// Build Types
gulp.task('build:development', seq('build', 'link', ['tsconfig-glob', 'index-inject', 'typescript'], 'watch'));

// component tasks

// symlink files
gulp.task('link-font-awesome', (done) => {
    let fontFiles = fs.readdirSync('node_modules/font-awesome/fonts').map((file) => `node_modules/font-awesome/fonts/${file}`);
    linkFilesTo(fontFiles, 'fonts');
    return done();
});


gulp.task('link-js', (done) => {
    linkFilesTo(vendorScripts, 'lib');
    return done();
});

let linkFilesTo = (files, folder) => {

    try {

        files.forEach((file) => {

            let fileName = path.basename(file),
                fileLocation = path.join(__dirname, file),
                linkLocation = path.join(__dirname, 'dist', folder, fileName);

            child_process.exec(`ln -s ${fileLocation} ${linkLocation}`);

        });

    } catch(e) {
        console.log(e);
    }
}

// Clean
gulp.task('clean', (done) => {

    mkdirp.sync('./dist');
    mkdirp.sync('./dist/js');
    mkdirp.sync('./dist/css');
    mkdirp.sync('./dist/fonts');
    mkdirp.sync('./dist/templates');
    mkdirp.sync('./dist/lib');

    return done()
});

// ng-templates
gulp.task('ng-templates', (done) => {

    gulp.src('./src/templates/**/*.html')
        .pipe(gulp.dest('./dist/templates'));

    return done();
});

// TypeScript / Javascript
gulp.task('typescript', (done) => {

    gulp.src('src/ts/**/*.ts')
        .pipe(typescript(typescript.createProject('./tsconfig.json')))
        .pipe(gulp.dest('dist/js'));

    return done();
});

gulp.task('typescript-concat', (done) => {

    gulp.src('src/ts/**/*.ts')
        .pipe(plumber())
        .pipe(typescript(typescript.createProject('./tsconfig.json')))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('boot.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(livereload())
        .pipe(gulp.dest('dist/js'));

    return done();

});

// required if you aren't using atom-typescript
gulp.task('tsconfig-glob', (done) => {
    // return tsFileGlob({
    //     configPath: '.',
    //     indent: 2
    // });
    return done;
});

// vendor
gulp.task('vendor-js-concat', () => {
    gulp.src(vendorScripts)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/lib'));
});

// Handlebars
gulp.task('index-inject', (done) => {

    let opts = {
        helpers: {
            'script-tag': (file) => {
                return `<script src="./lib/${path.basename(file)}"></script>`;
            }
        }
    },
    data = {
        vendorScripts: vendorScripts
    };

    gulp.src('./src/index.hbs')
        .pipe(plumber())
        .pipe(handlebars(data, opts))
        .pipe(livereload())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'));

    return done();
});

// SCSS
gulp.task('scss', (done) => {

    gulp.src('./src/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(livereload())
        .pipe(gulp.dest('./dist/css'));

    return done();
});

// watch
gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(['./src/scss/**/*.scss'],  ['scss']);
    gulp.watch(['./src/ts/**/*.ts'],  ['tsconfig-glob', 'typescript']);
    gulp.watch(['./src/**/*.html'],  ['ng-templates']);
});
