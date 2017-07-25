var gulp = require('gulp');
var	uglify = require('gulp-uglify');
var	sass = require('gulp-sass');
var	plumber = require('gulp-plumber');
var	browserSync = require('browser-sync');
var	concat = require('gulp-concat');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');


// Scripts Task
gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});

// Styles Task
gulp.task('styles', function() {
	return gulp.src('src/scss/style.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(postcss([autoprefixer({
			browsers: [
				'last 2 versions',
				'ie >= 9',
				'Android >= 2.3',
				'ios >= 7'
			]
		})]))
		.pipe(gulp.dest('dist/css/'));
});


// Browser Sync Task
gulp.task('browserRefresh', ['styles', 'scripts'], browserSync.reload);


// Watch Task
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


// Default Task
gulp.task('default', ['scripts', 'styles']);