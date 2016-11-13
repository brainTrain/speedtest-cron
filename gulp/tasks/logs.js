'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import config from '../config';
import buffer from 'vinyl-buffer';
import cdnizer from 'gulp-cdnizer';
import rev from 'gulp-rev';

gulp.task('logs', () => {
    // TODO: figure out a DRY way to do this
    return gulp.src(config.logs.src)
        .pipe(gulp.dest(config.logs.devDest))
        .pipe(buffer())
        .pipe(gulp.src(config.logs.src))
        .pipe(gulp.dest(config.logs.prodDest));
});
