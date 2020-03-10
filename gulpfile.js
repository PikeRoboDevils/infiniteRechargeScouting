/* eslint-disable */
const autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  cleanCSS = require('gulp-clean-css'),
  copyDepsYaml = './copydeps.yml',
  cssImporter = require('node-sass-css-importer')({
    import_paths: ['./scss']
  }),
  del = require('del'),
  eslint = require('gulp-eslint'),
  gulp = require('gulp'),
  log = require('fancy-log'),
  newer = require('gulp-newer'),
  path = require('path'),
  reload = browserSync.reload,
  rename = require('gulp-rename'),
  rollup = require('rollup'),
  rollupBabel = require('rollup-plugin-babel'),
  rollupCommonjs = require('rollup-plugin-commonjs'),
  rollupResolve = require('rollup-plugin-node-resolve'),
  rollupUglify = require('rollup-plugin-uglify').uglify,
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  themeYaml = './theme.yml',
  year = new Date().getFullYear(),
  yaml = require('yamljs');

let copyDeps = yaml.load(copyDepsYaml);
let theme = yaml.load(themeYaml);

const babelConfig = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
        exclude: ['transform-typeof-symbol']
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread'
  ],
  env: {
    test: {
      plugins: ['istanbul']
    }
  },
  exclude: 'node_modules/**', // Only transpile our source code
  externalHelpersWhitelist: [ // Include only required helpers
    'defineProperties',
    'createClass',
    'inheritsLoose',
    'defineProperty',
    'objectSpread'
  ],
};

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function() {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: [cssImporter]
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./www/css/'))
    .pipe(browserSync.stream({
      match: "./scss/ionic.app.scss"
    }));
});

gulp.task('sass-min', function () {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: [cssImporter]
    }).on('error', sass.logError))
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }))
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./www/css/'))
    .pipe(browserSync.stream({
      match: "./scss/ionic.app.scss"
    }));
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});


gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
