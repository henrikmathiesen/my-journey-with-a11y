const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const del = require('del');

const config = {
    path: {
        src: './src',
        bld: './build'
    }
};

gulp.task('clean-build-folder', function () {
    del.sync(config.path.bld);
});

gulp.task('handlebars', function () {
    return gulp
        .src(config.path.src + '/pages/**/*.hbs')
        .pipe(handlebars({}, {
            batch: [config.path.src + '/layouts'],
        }))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest(config.path.bld));
});

gulp.task('copy-css', function () {
    return gulp
        .src(config.path.src + '/css/style.css')
        .pipe(gulp.dest(config.path.bld));
});

gulp.task('default', ['clean-build-folder', 'handlebars', 'copy-css'], function () { });
