var
    gulp            = require('gulp'), 
    child_process   = require('child_process'),
    exec   = require('child_process').exec,
    minifyCss = require('gulp-minify-css'),
    nodemon         = require('gulp-nodemon');

// startup required services to run the app server
gulp.task('mongod', function() { 
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
});
// Run app.js with nodemon
gulp.task('dev', function () {
  nodemon({ script: 'app.js'
          , ext: 'js' }).on('restart', function () {
      console.log('restarted!')
  });
});
// Run mocha tests
gulp.task('test', function () {
    // spawn in a child process mongodb
    exec('mocha', function(err,stdout,stderr){
        console.log(stdout);
    });
});
// Minify Css files
gulp.task('minify-css', function() {
  return gulp.src('public/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css'));
});
//deploy to heroku stage server
gulp.task('auto-push', function () {
    //add files to commit
    exec('gga', function(err,stdout,stderr){
        console.log(stdout);
    });
    //commit files
    exec('git commit -m \"deploying to stage server with gulp command test2\"', function(err,stdout,stderr){
        console.log(stdout);
    });
    //push to github
    exec('git push origin staging', function(err,stdout,stderr){
        console.log(stdout);
    });
});
// automated deployment
gulp.task('stage-deploy',['mongod','test','minify-css','auto-push']);
// start dev environment
  gulp.task('startup', ['mongod','minify-css','dev']);
