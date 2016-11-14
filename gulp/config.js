'use strict';

export default {
    port: 9001,
    devDir: 'dev/',
    prodDir: 'public/',
    scripts: {
        watch: './app/js/*.js',
        src: './app/js/index.js',
        devDest: 'dev/js',
        prodDest: 'public/js/'
    },
    styles: {
        watch: 'app/scss/**/*.scss',
        src: 'app/scss/index.scss',
        devDest: 'dev/css',
        prodDest: 'public/css'
    },
    images: {
        src: 'app/images/**/*',
        devDest: 'dev/images',
        prodDest: 'public/images',
    },
    logs: {
        src: 'logs/*.json',
        devDest: 'dev/logs',
        prodDest: 'public/logs',
    },
    views: {
        src: 'app/index.html',
        devDest: 'dev/',
        prodDest: ''
    },
    svg: {
        src: 'app/icons/*.svg',
        devDest: 'dev/icons',
        prodDest: 'public/icons',
        config: {
            mode: {
                symbol: {
                    render: {
                        css: false,
                        scss: false
                    },
                    dest: 'sprite',
                    prefix: '.svg-%s',
                    example: false
                }
            }
        }
    },
    cdn: {
        prodBaseUrl: '/speedtest-cron/public',
        devBaseUrl: '',
        files: [
            '/js/*.js',
            '/css/*.css',
            '/images/*.*',
            'dev/css/*.css',
            'public/css/*.css',
            'dev/js/*.js',
            'public/js/*.js',
            'dev/images/*.{jpg,jpeg,png,gif,svg,ico}',
            'public/images/*.{jpg,jpeg,png,gif,svg,ico}'
        ],
        imageFiles:[
            '/images/*.*'
        ]
    },
    manifest: {
        jsProdDest : 'public/js/rev-manifest.json',
        cssProdDest : 'public/css/rev-manifest.json'
    }
};
