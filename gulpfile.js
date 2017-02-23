const gulp = require('gulp'),
    gulpPug = require('gulp-pug'),
    gulpWireDep = require('gulp-wiredep'),
    gulpScss = require('gulp-scss'),
    gulpConcat = require('gulp-concat'),
    del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('pug', function(){
    return gulp.src('app/*.pug')
        .pipe(gulpPug({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scss', function() {
    return gulp.src('app/styles/*.scss', {base: 'app'})
        .pipe(gulpScss())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: ['.','dist']
    });
    gulp.watch('app/*.pug', gulp.series('pug'));
    gulp.watch('app/**/*.scss', gulp.series('scss'));
    gulp.watch('app/**/*.js', gulp.series('js'));
});

gulp.task('wiredep', function() {
    return gulp.src('app/*.pug')
        .pipe(gulpWireDep())
        .pipe(gulp.dest('app/'));
});

gulp.task('js', function() {
   return gulp.src('app/js/*.js')
       .pipe(gulpConcat('main.js'))
       .pipe(gulp.dest('dist/js/'));
});

gulp.task('del', function() {
    return del(['dist']);
});



gulp.task('default', gulp.series('del','wiredep','pug','js','scss','browser-sync'));