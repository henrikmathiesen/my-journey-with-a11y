const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const del = require('del');
const connect = require('gulp-connect');

const config = {
    path: {
        src: './src',
        bld: './build',
        srcWatch: './src/**/*'
    },
    server: {
        port: '1337'
    }
};

gulp.task('clean-build-folder', function () {
    del.sync(config.path.bld);
});

gulp.task('handlebars', function () {
    gulp
        .src(config.path.src + '/pages/**/*.hbs')
        .pipe(handlebars({}, {
            batch: [
                config.path.src + '/layouts',
                config.path.src + '/partials'
            ],
        }))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest(config.path.bld));
});

gulp.task('copy-css', function () {
    gulp
        .src(config.path.src + '/css/style.css')
        .pipe(gulp.dest(config.path.bld));
});

gulp.task('connect', function () {
    connect.server({
        root: config.path.bld,
        port: config.server.port
    });
});


gulp.task('build', ['clean-build-folder', 'handlebars', 'copy-css'], function () { });

gulp.task('watch', function () {
    gulp.watch(config.path.srcWatch, ['build']);
});

gulp.task('default', ['build', 'watch', 'connect'], function () { });
