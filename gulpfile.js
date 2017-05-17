// var gulp = require("gulp");
// var ts = require("gulp-typescript");
// var tsProject = ts.createProject("tsconfig.json");

// gulp.task("default", function () {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest("dist"));
// });

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var ts = require("gulp-typescript");
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var glob = require('glob');
var del = require('del');
// var _ = require('underscore');
// var es = require('event-stream');
// var merge = require('merge-stream');
var merge = require('gulp-merge');


var paths = {
    dtsDest : 'dist/ts/definitions/',
    browserJsTemp : 'dist/temp/js/',
}
//static files do nothing   paths /p/

// /src/js/*.js browserfy.copy dist/js/
var browserJs = {
    js:     ['src/js/*.js'],
    // ts:     ['src/js/*.ts'],
    target: 'dist/js/',
    dtsDest:    'dist/ts/definitions/',
    browserJsTemp:  'dist/temp/js/'
}
// source code
var sourceCode = ['bin/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'app.js', 'common/**/*.js', 'lib/**/*.js', 'views/**/*.html'];
var serverModelTS = ['src/models/**/*.ts'];
var viewsCode = ['views/**/*.html'];
// TypeScript Project define
// var tsBrowserProject = ts.createProject({
//     removeComments : true,
//     noImplicitAny : true,
//     target : 'ES3',
//     module : 'commonjs',
//     declarationFiles : true
// });
// var tsServerProject = ts.createProject({
//     removeComments : true,
//     noImplicitAny : true,
//     allowJs: true,
//     lib: ["es2015"],
//     types: ["node"],
//     target : 'ES2015',
//     declarationFiles : false
// });

// Browser TS file preprocess
// gulp.task('browser-ts', function(){
//     var tsResult = gulp.src(browserJs.ts).pipe(tsBrowserProject());
//     return merge([tsResult.dts.pipe(gulp.dest(browserJs.dtsDest)),
//         tsResult.js.pipe(gulp.dest(browserJs.browserJsTemp))]);
// })
// Browser JS file preprocess
gulp.task('browser-js', function(){
    return gulp.src(browserJs.js).pipe(gulp.dest(browserJs.browserJsTemp));
})
// Browser JS file browserify
gulp.task('browser-browserify', ['browser-js'], function(done){
    var files = glob.sync(browserJs.browserJsTemp + '*.js');
    var tasks = files.map(function(filename){
        var name = filename.substr('dist/temp/js/'.length);
        return browserify({
            basedir: 'dist/temp/js/',
            debug: true,
            entries: [name]
            // paths: ['dist/temp/js/']
            // cache: {},
            // packageCache: {}            
        }).bundle()
        .pipe(source(name))
        .on('error', err => {
            gutil.log('Browserify Error', gutil.colors.red(err.message))
        })
        // .pipe(sourcemaps.init({ loadMaps: true })).pipe(uglify()).pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(browserJs.target));
    })
    // es.merge(tasks).on('end',done);
    return merge(tasks);
    // glob(browserJs.browserJsTemp + '*.js', function(err, files){
    // })

})
// precompile server side models TypeScript file
// gulp.task('source-model', function(){
//     return gulp.src(serverModelTS, {base:'src/'})
//         .pipe(tsServerProject())
//         .pipe(gulp.dest('dist/'));
// })

// copy server side code
gulp.task('source-code', function(){
    var tasks = sourceCode.map(function(element){
        return gulp.src(['src/'+element], {base:'src/'}).pipe(gulp.dest('dist/'));
    })
    return merge(tasks);
})
gulp.task('default', ['browser-browserify', 'source-code'], function(){
})

gulp.task('clean', function(){
    return del('dist/**/*', {force:true})
})
gulp.task('copy-view', function(){
    var tasks = viewsCode.map(function(element){
        return gulp.src(['src/'+element], {base:'src/'}).pipe(gulp.dest('dist/'));
    })
    return merge(tasks);
})