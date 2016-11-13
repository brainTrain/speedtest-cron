'use strict';

import gulp from 'gulp';
import config from '../config';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import rev from 'gulp-rev';
import uglify from 'gulp-uglify';

gulp.task('scripts', () => {
    // Grabs the app.js file
    return browserify(config.scripts.src)
        .transform(babelify)
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.scripts.devDest))
        .pipe(buffer())
        .pipe(uglify())
        //.pipe(rev())
        //.pipe(rev.manifest())
        // saves it the public/js/ directory
        .pipe(gulp.dest(config.scripts.prodDest));
});
