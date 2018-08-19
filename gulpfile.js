"use strict";

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    prettify = require('gulp-html-prettify'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('connect', function() {
    connect.server({
        root: 'build/dest',
        livereload: true
    });
    // opn('http://localhost:8080');
});

gulp.task('css', function() {
    gulp.src('build/src/scss/all.scss')
        .pipe(sass())
        .pipe(autoprefixer('> 1%'))
        .pipe(csso({ comments: false }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/dest/css'))
        .pipe(connect.reload());
});

gulp.task('pug', function() {
    var locals = './build/src/content.json';

    gulp.src('build/src/markup/pages/*.pug')
        .pipe(pug())
        .pipe(prettify({
            unformatted: [],
            indent_char: '\t',
            indent_size: 1
        }))
        .pipe(gulp.dest('build/dest/'))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    gulp.src('build/src/fonts/*')
        .pipe(gulp.dest('build/dest/fonts'));
});

gulp.task('img', function() {
    gulp.src('build/src/img/*.*')
        .pipe(gulp.dest('build/dest/img'));
});

gulp.task('js', function() {
    gulp.src("build/src/js-no-concat/**/*.*")
        .pipe(gulp.dest("build/dest/js"))
    gulp.src(['build/src/**/*.js', '!build/src/js-no-concat/**/*'])
        .pipe(concat('js.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/dest/js'))
        .pipe(connect.reload());
});

gulp.task('vendor', function() {
    // yarn files
    var nm = "node_modules/";
    var pathToSave = "build/dest/vendor/";

    gulp.src(nm + "jquery/dist/jquery.min.js")
        .pipe(gulp.dest(pathToSave))

    gulp.src(nm + "masonry-layout/dist/masonry.pkgd.min.js")
        .pipe(gulp.dest(pathToSave))

    gulp.src(nm + "normalize-scss/sass/**/*")
        .pipe(gulp.dest("build/src/scss/includes/normalize"))


    // gulp.src(bc + "slick-carousel/slick/slick.css")
    //     .pipe(csso())
    //     .pipe(rename('slick.min.css'))
    //     .pipe(gulp.dest(pathToSave + "slick"))

    // gulp.src(bc + "slick-carousel/slick/slick-theme.css")
    //     .pipe(csso())
    //     .pipe(rename('slick-theme.min.css'))
    //     .pipe(gulp.dest(pathToSave + "slick"))

    // gulp.src(bc + "slick-carousel/slick/slick.min.js")
    //     .pipe(gulp.dest(pathToSave + "slick"))

    // gulp.src(bc + "slick-carousel/slick/*.gif")
    //     .pipe(gulp.dest(pathToSave + "slick"))

    // gulp.src(bc + "slick-carousel/slick/fonts/**")
    //     .pipe(gulp.dest(pathToSave + "slick/fonts"))
});

gulp.task('watch', function() {
    gulp.watch(['build/src/**/*.pug'], ['pug']);
    gulp.watch(['build/src/**/*.scss'], ['css']);
    gulp.watch(['build/src/**/*.js'], ['js']);
});

gulp.task('default', [
    'fonts',
    'img',
    'js',
    'vendor',
    'pug',
    'css',
    'connect',
    'watch'
]);