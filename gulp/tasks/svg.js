'use strict';

import gulp from 'gulp';
import config from '../config';
import svgSprite from 'gulp-svg-sprites';

gulp.task('svg', () => {
    return gulp.src(config.svg.src)
        .pipe(svgSprite(config.svg.config))
        .pipe(gulp.dest(config.svg.devDest))
        .pipe(gulp.dest(config.svg.prodDest));
});
