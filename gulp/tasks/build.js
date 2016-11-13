'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', () => {
    runSequence('clean', ['scripts', 'styles', 'views', 'images', 'svg', 'logs']);
});
