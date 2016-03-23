/* Servidor web gulp para desarrollo 
 */

var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');


gulp.task('serve', function() {
    connect.server({
        port: 4000,
        host: 'localhost'
    });
});

function compileJs(proyect, app){
	console.log('');
	console.log('Proyect ERP-UPeU');
	console.log('construyendo ------ javascript | '+app+' |');
	return gulp.src([''+proyect+'/'+app+'/**/*.js'])
	.pipe(concat(''+app+'.min.js'))
	.pipe(uglify({ mangle: false }))
	.pipe(gulp.dest(''+proyect+'/build/'+app+''));
}

function compileHtml(proyect, app){
	console.log('');
	console.log('construyendo ------ html | '+app+' |');
	return gulp.src([''+proyect+'/'+app+'/views/**/*.html'])
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(''+proyect+'/build/'+app+'/views'))
}


// BUILD DE APLICACION

gulp.task('catalogo', function() {
	var proyect="ioteca_web3"
	var app="catalogo"
	return compileJs(proyect, app)+compileHtml(proyect, app);
});


