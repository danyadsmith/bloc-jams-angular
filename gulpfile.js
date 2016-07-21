var gulp = require('gulp');
var beeper = require('beeper');
var browsersync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

function onError(err) {
  beeper();
  console.log(err);
}

gulp.task('browsersync', function(cb){
  return browsersync({
    server: {
      baseDir: './'
    }
  }, cb);
});

gulp.task('clean', function(cb){
  return del(['assets/*'], cb);
});

gulp.task('album_cover_images', function(){
  return gulp.src('_/dev/img/album_covers/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images/album_covers'));
});

gulp.task('background_images', function(){
  return gulp.src('_/dev/img/blurred_backgrounds/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images/blurred_backgrounds'));
});

gulp.task('images', function(){
  return gulp.src('_/dev/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images')); 
});

gulp.task('scripts', function() {
  return gulp.src('_/dev/js/*.js')
    .pipe(sourcemaps.init())
    //.pipe(concat('all.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/scripts'));
});

gulp.task('styles', function() {
  return gulp.src('_/dev/scss/*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['node_modules/susy/sass']
    }).on('error', sass.logError))
    .pipe(gulp.dest('assets/styles'));
});

gulp.task('watch', function(){
  gulp.watch('*.html', browsersync.reload);
  gulp.watch('_/dev/scss/*', 
  gulp.series('styles', browsersync.reload));
  gulp.watch('_/dev/js/*.js', 
  gulp.series('scripts', browsersync.reload));
  gulp.watch('_/dev/img/*', 
  gulp.series('images', browsersync.reload));
});

gulp.task('default', gulp.parallel('browsersync', 'styles', 'scripts', 'images', 'album_cover_images', 'background_images', 'watch'));