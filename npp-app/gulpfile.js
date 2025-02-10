'use strict';
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

// Define a 'sass' task
gulp.task('sass', function () {
    return gulp.src('./src/sass/custom.scss')
        .pipe(concat('custom.scss'))
        .pipe(sass().on('error', sass.logError))
        //.pipe(cleanCSS()) // Minify the CSS
        .pipe(gulp.dest('./src/dist/'));
});

// Define a 'sass:watch' task with the 'sass' task as a dependency
gulp.task('sass:watch', function () {
    // Watch for changes in any Sass file in the './src' directory or its subdirectories
    gulp.watch('./src/**/*.scss', gulp.series('sass'));
});

