'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import config from '../config';
import buffer from 'vinyl-buffer';
import cdnizer from 'gulp-cdnizer';
import rev from 'gulp-rev';

gulp.task('styles', () => {
    // TODO: figure out a DRY way to do this
    return gulp.src(config.styles.src)
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(cdnizer({
            files: config.cdn.imageFiles,
            defaultCDNBase: config.cdn.devBaseUrl
        }))
        .pipe(gulp.dest(config.styles.devDest))
        .pipe(buffer())
        .pipe(gulp.src(config.styles.src))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(cdnizer({
            files: config.cdn.imageFiles,
            defaultCDNBase: `/norcaltrimmers/${config.cdn.prodBaseUrl}`
        }))
        //.pipe(rev())
        //.pipe(rev.manifest())
        .pipe(gulp.dest(config.styles.prodDest));
});
