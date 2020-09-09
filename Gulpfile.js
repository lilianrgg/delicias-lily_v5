'use strict'

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', function (done) {
    gulp.src('./assets/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'));
    done();
});


gulp.task('sass:watch', function () {
    gulp.watch('./assets/css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
    var files = ['./*.html', './assets/css/*.css', './assets/img/*.{png,jpg,gif}', './assets/js/*.js'];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});


gulp.task('default', gulp.series('browser-sync', function () {
    gulp.start('sass:watch');
}));

gulp.task('clean', function () {
    return del(['dist']);
});

function copyfonts1() {
   return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,woff2,eof,svg,eot,otf}*')
        .pipe(gulp.dest('./dist/webfonts'));
}

function imagemin1() {
    return gulp.src('./assets/img/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/assets/img'));
        
}

function usemin1() {
    return gulp.src('./*.html')
        .pipe(flatmap(function (stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function () { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), 'concat']
                }));
        }))
        .pipe(gulp.dest('dist/'));
        
}



gulp.task('build', gulp.series('clean', gulp.parallel(copyfonts1, imagemin1,usemin1)));