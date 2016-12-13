var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync');
	concat = require('gulp-concat');


// Scripts Task
gulp.task('scripts', function() {
	return gulp.src('js/custom/*.js')
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/'));
});

// Styles Task
gulp.task('styles', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('dist/css'));
});


// Browser Sync Task
gulp.task('browserRefresh', ['styles', 'scripts'], browserSync.reload);


//Watch Task
gulp.task('watch', function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('src/js/*.js', ['browserRefresh']);
	gulp.watch('src/scss/*.scss', ['browserRefresh']);
	gulp.watch('./**/*.html', ['browserRefresh']);
});


//Default Task
gulp.task('default', ['scripts', 'styles']);