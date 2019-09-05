'use-strict';

const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const postsvg = require('postcss-inline-svg');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const fonts = require('postcss-font-magician');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();

// File Path
const files = {
  scssPath: 'src/assets/scss/**/*.scss',
  jsPath: 'src/assets/js/**/*.js',
  imgPath: 'src/assets/img/**/*'
}

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './src',
    },
    port: 3000,
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function scssTask() {
  const plugin = [
    autoprefixer(),
    postsvg(),
    cssnano(),
    fonts({
      foundries: 'bootstrap google',
    }),
  ];
  return gulp
    .src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss(plugin))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browsersync.stream());
}

function jsTask() {
  return gulp
    .src(['src/assets/js/jquery.min.js', 'src/assets/js/bootstrap.min.js', 'src/assets/js/slick.min.js', 'src/assets/js/carousel.js', 'src/assets/js/toggler.js', 'src/assets/js/scrollTop.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest('src/assets/js'))
}

function imageTask() {
    return gulp
      .src(files.imgPath)
      .pipe(imagemin())
      .pipe(gulp.dest('dist/assets/img'))
}

function fontTask() {
  return gulp
    .src('src/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
}

function js() {
  return gulp
    .src('src/assets/js/script.js')
    .pipe(useref())
    .pipe(gulp.dest('dist/assets/js'));
}

function css() {
  return gulp
    .src('src/assets/css/**/*.css')
    .pipe(useref())
    .pipe(gulp.dest('dist/assets/css'));
}

function userefTask() {
  return gulp
    .src('src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
}

function watchTask() {
  gulp.watch(files.scssPath, scssTask);
  gulp.watch('src/*.html', browserSyncReload);
}

// Default
exports.default = gulp.series(
  gulp.parallel(scssTask, jsTask)
);

// Production
gulp.task('build:prod',gulp.parallel([css, js, imageTask, fontTask, userefTask]));

// Development
gulp.task('build:dev', gulp.parallel(watchTask, browserSync));