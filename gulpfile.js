const { series, parallel, src, dest, watch } = require('gulp');
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
    src(config.path.src + '/css/style.css')
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

const buildTask = series(cleanBuildFolderTask, parallel(handlebarsTask, copyCssTask));

function watchTask(cb) {
    watch(config.path.srcWatch, buildTask);
    cb();
}

exports.build = buildTask;
exports.default = series(buildTask, parallel(watchTask, connectTask));
