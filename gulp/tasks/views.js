'use strict';

import gulp from 'gulp';
import config from '../config';
import revReplace from 'gulp-rev-replace';
import buffer from 'vinyl-buffer';
import cdnizer from 'gulp-cdnizer';

// Views task
gulp.task('views', () => {
    let jsManifest = gulp.src([
        config.manifest.jsProdDest
    ]);

    let cssManifest = gulp.src([
        config.manifest.cssProdDest
    ]);

    // TODO: figure out a DRY way to do this
    return gulp.src(config.views.src)
        .pipe(cdnizer({
            files: config.cdn.files,
            defaultCDNBase: config.cdn.devBaseUrl
        }))
        .pipe(gulp.dest(config.views.devDest))
        .pipe(buffer())
        .pipe(gulp.src(config.views.src))
        //.pipe(revReplace({manifest: jsManifest}))
        //.pipe(revReplace({manifest: cssManifest}))
        .pipe(cdnizer({
            files: config.cdn.files,
            defaultCDNBase: `/norcaltrimmers/${config.cdn.prodBaseUrl}`
        }))
        .pipe(gulp.dest(config.views.prodDest));
});
