'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');

gulp.task('copy', function() {
    return gulp.src([
            'assets/fonts/bootstrap/*'
        ])
        .pipe(gulp.dest('html/fonts/bootstrap/'));
});

gulp.task('sass', function() {
    return gulp.src([
            'assets/stylesheets/style.scss'
        ])
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(minifycss())
        .pipe(gulp.dest('html/css/'))
        .pipe(browserSync.stream());
})

gulp.task('default', ['copy','sass'], function() {
    browserSync.init({
        server: {
            baseDir: "html"
        }
    });

    console.log('------------------gulp watch-------------------');
    gulp.watch(['html/index.html'], browserSync.reload);
    gulp.watch(['assets/stylesheets/**/*.scss'], ['sass']);
});
