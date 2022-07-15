const { series, parallel, src, dest, watch } = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
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

function cleanBuildFolderTask(cb) {
    del.sync(config.path.bld);
    cb();
}

function handlebarsTask(cb) {
    src(config.path.src + '/pages/**/*.hbs')
        .pipe(handlebars({}, {
            batch: [
                config.path.src + '/layouts',
                config.path.src + '/partials'
            ],
        }))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(dest(config.path.bld));

    cb();
}

function copyCssTask(cb) {
    src(config.path.src + '/css/*.css')
        .pipe(dest(config.path.bld));

    cb();
}

function copyJsTask(cb) {
    src(config.path.src + '/js/*.js')
        .pipe(dest(config.path.bld));

    cb();
}

function miniFyAndCopyCss(cb) {
    src(config.path.src + '/css/*.css')
        .pipe(minifyCSS())
        .pipe(dest(config.path.bld))

    cb();
}

function minifyAndCopyJs(cb) {
    src(config.path.src + '/js/*.js')
        .pipe(uglify())
        .pipe(dest(config.path.bld));
    cb();
}

function connectTask(cb) {
    connect.server({
        root: config.path.bld,
        port: config.server.port
    });

    cb();
}

function watchTask(cb) {
    watch(config.path.srcWatch, runTask);
    cb();
}

const runTask = series(cleanBuildFolderTask, parallel(handlebarsTask, copyCssTask, copyJsTask));
const buildTask = series(cleanBuildFolderTask, parallel(handlebarsTask, miniFyAndCopyCss, minifyAndCopyJs));

exports.build = buildTask;
exports.default = series(runTask, parallel(watchTask, connectTask));
