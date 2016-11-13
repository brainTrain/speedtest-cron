'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('local', () => {
    runSequence(['build', 'watch', 'connect']);
});
