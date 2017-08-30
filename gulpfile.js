var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('default', ['watch']);

gulp.task('build-css', function() {
  return gulp.src('src/sass/*.scss')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('src/components/stylesheets/'));
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['build-css']);
});
