var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var BROWSER_SYNC_RELOAD_DELAY = 500;
var historyApiFallback = require('connect-history-api-fallback');

var nodemon = require('gulp-nodemon');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        // nodemon our expressjs server
        script: 'index.js',

        // watch core server file(s) that require server restart on change
        watch: ['index.js','server/**/*.js']
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) { cb(); }
            called = true;
        })
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});



//browsersync
gulp.task('browser-sync', ['nodemon'], function () {
    /*
        browserSync.init({
            server: {
            
                baseDir: "./",
                middleware: [ historyApiFallback() ],
                //directory: true remove middleware in order to work directory of projects
            },
    
            
            port:3300
        });
        
          // for more browser-sync config options: http://www.browsersync.io/docs/options/
    */
    browserSync({
        baseDir: "./",
        middleware: [historyApiFallback()],


        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:4000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 3300,

        // open the proxied app in chrome
        browser: ['chrome']
    });

});

//var browserSync = require('browser-sync').create();
//var reload      = browserSync.reload;
//gulp.watch("*.html").on("change", reload);

gulp.task('js', function () {
    return gulp.src('app/**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
    return gulp.src('app/**/*.css')
        .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
    browserSync.reload();
});
gulp.task('bss-reload', function () {
    browserSync.reload();
});
gulp.task('bsss-reload', function () {
    browserSync.reload();
});
gulp.task('browser-synch-watch', ['browser-sync'], function () {
    gulp.watch('app/**/*.js', ['js', 'bsss-reload']);
    gulp.watch('app/**/*.css', ['css']);
    gulp.watch('app/**/*.html', ['bs-reload']);
    gulp.watch('./*.html', ['bss-reload']);
});


var tsServerProject = ts.createProject({
    declarationFiles: false,
    noResolve: false,
    module: 'commonjs',
    target: 'ES5'
});

var srcServer = 'app/**/*.ts'

gulp.task('default', ['compile-server', 'browser-synch-watch'], watchServer);
gulp.task('compile-server', compileServer);

function watchServer(params) {
    gulp.watch(srcServer, ['compile-server']);
}

function compileServer(params) {
    var tsResult = gulp.src(srcServer)
        .pipe(sourcemaps.init())
        .pipe(tsServerProject());

    return tsResult.js
        .pipe(sourcemaps.write('./source-maps'))
        .pipe(gulp.dest('app/'));

}