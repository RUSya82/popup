var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
const concat = require("gulp-concat");
const autoprefix = require("gulp-autoprefixer");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const distJS = "./dist/js/";
const distCSS = "./dist/css/";
const dist = "./dist/";


gulp.task("build-js", () => {
    return gulp.src("js/*.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(distJS))
        .on("end", browserSync.reload);
});
gulp.task('sass', () => {
    return gulp.src("sass/*.s*ss")
        .pipe(sass({
            // outputStyle: 'compressed'
        }))
        .pipe(concat('main.css'))
        .pipe(autoprefix({
            Browserslist: ['last 8 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(distCSS))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
				return gulp.src("*.html")
					.pipe(gulp.dest("dist"))
                    .pipe(browserSync.stream());
	})
// gulp.task('images', () => {
//     return gulp.src("app/img/**/*.*")
//         .pipe(gulp.dest("dist/img/"))
//         .pipe(browserSync.stream());
// });
gulp.task('serve', function(done) {

    browserSync.init({
        server: "dist"
    });

    gulp.watch("sass/*.s*ss", gulp.series('sass'));
    gulp.watch("js/*.js", gulp.series('build-js'));
    gulp.watch("*.html", gulp.series('html'));
    // gulp.watch("app/img/**/*.*", gulp.series('images'));
    gulp.watch("app/*.*").on('change', () => {
      browserSync.reload();
      done();
    });
    done();
});

gulp.task('default', gulp.series('sass', 'html' ,'build-js','serve'));