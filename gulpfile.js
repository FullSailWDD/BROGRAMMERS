var
    gulp            = require('gulp'), 
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon');

// startup required services to run the app server
gulp.task('mongod', function() { 
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
});

gulp.task('dev', function () {
  nodemon({ script: 'app.js'
          , ext: 'js' }).on('restart', function () {
      console.log('restarted!')
    })
});
gulp.task('test',function(){
    child_process.exec('mocha', function(err,stdout,stderr){
    	console.log(stdout);
    });
});
  gulp.task('startup', ['mongod', 'dev']);
