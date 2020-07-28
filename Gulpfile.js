var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

//var gulp = require('gulp')
var paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'assets/styles/',
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'assets/scripts/',
    },
}

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
    // You can use multiple globbing patterns as you would with `gulp.src`,
    // for example if you are using del 2.0 or above, return its promise
    return del(['assets'])
}

/*
 * Define our tasks using plain functions
 */
function styles() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sass())
            .pipe(cleanCSS())
            // pass in options to the stream
            .pipe(
                rename({
                    basename: 'main',
                    suffix: '.min',
                })
            )
            .pipe(gulp.dest(paths.styles.dest))
    )
}

function scripts() {
    return gulp
        .src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
}

function watch() {
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.styles.src, styles)
}

exports.default = gulp.series(clean, gulp.parallel(styles, scripts))
exports.watch = watch
