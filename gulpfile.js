var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('default', ['watch']);

gulp.task('build-css', function() {
  return gulp.src('src/js/components/stylesheets/*.scss')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('src/js/components/stylesheets/components'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/components/stylesheets/sass/**/*.scss', ['build-css']);
});
