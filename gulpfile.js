"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    prefix = require('gulp-autoprefixer'),
    ngAnnotate = require('gulp-ng-annotate');

// connect
gulp.task('connect', function () {
    connect.server({
        root: 'app/prod',
        livereload: true
    });
});

// watch
gulp.task('watch', function () {
    gulp.watch('app/dev/**/*.js', ['js']);
    gulp.watch('app/dev/**/*.json', ['json']);
    gulp.watch('app/dev/**/*.css', ['css']);
    gulp.watch('app/dev/**/*.html', ['html']);
});


// html
gulp.task('html', function () {
    gulp.src('app/dev/**/*.html')
        .pipe(gulp.dest('app/prod/'))
        .pipe(connect.reload());
});

// css
gulp.task('css', function () {
   gulp.src([
            "app/dev/css/style.css"
        ])
        .pipe(prefix({
            browsers: ['last 40 versions']
        }))
        .pipe(gulp.dest('app/prod/css'))
        .pipe(connect.reload());
});


//js
gulp.task('js', function () {
    gulp.src([
            "node_modules/jquery/dist/jquery.js",
            "node_modules/angular/angular.js",
            "app/dev/js/*.js"

        ])
        .pipe(ngAnnotate())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/prod/js'))
        .pipe(connect.reload());
});


// json
gulp.task('json', function () {
    gulp.src([
            "app/dev/db/*.json"

        ])
        .pipe(gulp.dest('app/prod/db'))
        .pipe(connect.reload());
});

// default
gulp.task('default', ['connect', 'js', 'json', 'css', 'html', 'watch']);