'use strict';

import gulp from 'gulp';
import config from '../config';
import runSequence from 'run-sequence';

gulp.task('watch', () => {
    let buildSources = [
        config.styles.watch,
        config.scripts.watch,
        config.views.src,
        config.images.src,
        config.svg.src
    ];
    gulp.watch(buildSources, ['build']);
});
