//------------------------------------
// Setup and Varibles
//------------------------------------
var gulp = require('gulp');
	browserSync = require('browser-sync');
	reload =  browserSync.reload;
	plumber = require('gulp-plumber');
	sass = require('gulp-sass');
	bourbon = require('node-bourbon').includePaths;
	neat = require('node-neat').includePaths;
	refills = require('node-refills').includePaths;
	minify = require('gulp-clean-css');
	uglify = require('gulp-uglify');
	rename = require('gulp-rename');
	concat = require('gulp-concat');
	header = require('gulp-header');

//------------------------------------
// Third party load libraries
//------------------------------------ 
gulp.task('build', function(){
	gulp.src([
		'bower_components/jquery/dist/jquery.min.js'
		//'bower_components/bootstrap/dist/js/bootstrap.min.js'
		])
	.pipe(plumber())
	// .pipe(concat('app.js'))
	.pipe(gulp.dest('./dist/js'));

	// return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
	//.pipe(gulp.dest('./dist/css'));

});
//------------------------------------
// Personal JS
//------------------------------------
gulp.task('scripts',function(){
	gulp.src(['js/secondHomemain.js'])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(header('/*Author: -cyrstem@gmail.com, Author URI: -onesimpleidea.xyz*/\n'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(reload({stream:true}));
});
//------------------------------------
//  sass to css + bourbon + neat
//------------------------------------
gulp.task('sass', function(){
	gulp.src('sass/*.scss')
		.pipe(sass({
			includePaths: bourbon,
			includePaths: neat,
			includePaths: refills
		}))
		.pipe(gulp.dest('dist/css/'))
		.pipe(plumber())
		.pipe(reload({stream:true}));
});

//------------------------------------
// Browser-Sync and html change reload
//------------------------------------
gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir:"./dist"
		}
	});

	 gulp.watch("dist/*.html").on("change", browserSync.reload);
});

//------------------------------------
// Watch task
//------------------------------------
gulp.task('watch', function(){
	gulp.watch('sass/*.scss',['sass']);
	gulp.watch('js/*.js',['scripts']);
	gulp.watch('dist/*.html');
});

//------------------------------------
// finish all anc compile
//------------------------------------
gulp.task('end',function(){
	gulp.src(['./app/third-party/jquery.min.js', 'js/works.js' ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(header('/*Author: -cyrstem@gmail.com, Author URI: -onesimpleidea.xyz*/\n'))
    .pipe(gulp.dest('./app/js/'))
    .pipe(plumber())
     return gulp.src('./app/css/newMain.css')
     	.pipe(minify())
		.pipe(rename({suffix:'.min'}))
		.pipe(header('/*Author: -cyrstem@gmail.com, Author URI: -onesimpleidea.xyz*/\n'))
		.pipe(gulp.dest('./app/css'));
	});

//------------------------------------
// Main task
//------------------------------------
gulp.task('default',['browser-sync','sass','scripts','watch']);



