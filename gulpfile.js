/* Servidor web gulp para desarrollo 
 */
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('serve', function() {
    connect.server({
        port: 4000,
        host: 'localhost'
    });
});



	function compileJs(app, model){
		console.log('');
		console.log('Proyect ERP-UPeU');
		console.log('build javascript | '+app+' : '+model+' |');
		return gulp.src(['src/apps/'+app+'/'+model+'/**/*.js'])
		.pipe(concat(''+model+'.min.js'))
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest('build/apps/'+app+'/'+model+''));
	}

	function compileHtml(app, model){
		console.log('');
		console.log('build DOM html | '+app+' : '+model+' |');
		return gulp.src(['src/apps/'+app+'/'+model+'/views/*.html'])
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build/apps/'+app+'/'+model+'/'))
	}