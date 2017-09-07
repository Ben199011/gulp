//加载gulp
var gulp=require('gulp');
//加载压缩html的插件
var htmlmin=require('gulp-htmlmin');
//加载压缩js的插件
var uglify=require('gulp-uglify');
//加载压缩css的插件
var cleanCss=require('gulp-clean-css');
//加载合并文件的插件
var concat=require('gulp-concat');
//修改文件名的插件
var rename=require('gulp-rename');
//编译less
var less=require('gulp-less');
//编译less,编译的结果在进行压缩
gulp.task('less',function(){
	gulp.src('src/less/*.less')
	.pipe(less())
	.pipe(cleanCss())
	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(gulp.dest('dist/less'))
});
//压缩html
   gulp.task('html',function(){
   	gulp.src('src/**/*.html')
   	.pipe(htmlmin({
   		collapseWhitespace: true, // 去掉空白字符
   		minifyJS:true,//压缩页面的js
   		minifyCSS:true,//压缩页面的css
   		removeComments: true//清除HTML注释
   	}))
   	.pipe(gulp.dest('dist'))
   });
//压缩js
gulp.task('js',function(){
	gulp.src('src/js/*.js')
//	.pipe(concat('js/built.js'))
    .pipe(uglify())
    .pipe(rename({
    	suffix:".min"
    }))
    .pipe(gulp.dest('dist/js'))
	})

//默认任务,监听文件变化,调用相关的任务再重复处理
gulp.task('default',function(){
	gulp.run(['less','html','js']);
	gulp.watch('src/less/*.less',function(){
		gulp.run('less');
	});
	gulp.watch('src/**/*.html',function(){
		gulp.run('html');
	});
	gulp.watch('src/js/*.js',function(){
		gulp.run('js');
	});
})

