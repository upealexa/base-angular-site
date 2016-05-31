var gulp = require('gulp');
var sass = require('gulp-sass');
var rubySass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var bower = require('gulp-bower');

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('app/css')).pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('bootstrap:sass', function() {
    return sass('app/scss/style.scss', {
            style: 'compressed',
            loadPath: [
                'app/libs/bootstrap-sass-official/assets/stylesheets',
                'app/libs/fontawesome/scss',
            ]
        })
        .on("error", notify.onError(function(error) {
            return "Error: " + error.message;
        }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('bower', function() {
    return bower().pipe(gulp.dest('app/libs'));
});

gulp.task('icons', function() {
    return gulp.src('app/libs/fontawesome/fonts/**.*')
        .pipe(gulp.dest('app/fonts'));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync.init({
        port: 8000,
        server: {
            baseDir: 'app'
        },
    });
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            // Setting interlaced to true
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('cache:clear', function(callback) {
    return cache.clearAll(callback);
});

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'],
        callback
    );
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    );
});
