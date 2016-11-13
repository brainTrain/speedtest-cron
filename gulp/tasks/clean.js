'use strict';

import gulp from 'gulp';
import config from '../config';
import runSequence from 'run-sequence';
import clean from 'gulp-clean';

gulp.task('clean', () => {
  return gulp.src([config.devDir, config.prodDir])
      .pipe(clean());
});
