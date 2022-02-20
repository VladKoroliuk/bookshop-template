const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const include = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const csso = require("gulp-csso");
const sync = require("browser-sync").create();
function html() {
  return gulp
    .src("src/html/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(gulp.dest("dist"));
}

function scss() {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
      })
    )
    .pipe(csso())
    .pipe(gulp.dest("./dist/css"));
}

function clear() {
  return del("dist");
}

function assets() {
  return gulp.src("./src/assets/**").pipe(gulp.dest("./dist/assets"));
}

function scripts() {
  return gulp.src("./src/js/*.js").pipe(gulp.dest("./dist/js"));
}

function serve() {
  sync.init({
    server: "./dist",
  });

  gulp.watch("src/html/**.html", gulp.series(html)).on("change", sync.reload);
  gulp.watch("src/sass/**.scss", gulp.series(scss)).on("change", sync.reload);
  gulp.watch("src/js/**.js", gulp.series(scripts)).on("change", sync.reload);
}

exports.serve = gulp.series(clear, scss, assets, scripts, html, serve);
exports.build = gulp.series(clear, scss, assets, scripts, html);
