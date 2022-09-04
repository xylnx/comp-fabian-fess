// ES5
// const gulp  = require('gulp');
// function myDefault(done) {
//   console.log('we are online, my friend');
//   done();
// }
// gulp.task('default', myDefault);

// ES6
import gulp from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import del from 'del';

// import webpack from 'webpack-stream';
const webpack = require('webpack'); 
const webpackStream = require('webpack-stream');

import named from 'vinyl-named'; // Allow to pass multiple files to webpack
import browserSync from 'browser-sync';
import zip from 'gulp-zip';
import replace from 'gulp-replace';
import info from './package.json';
import nunjucks from 'gulp-nunjucks';


// use to run gulp with --prod flag --> true
// without --> undefined (false)
// define if we are in production or in dev
const PRODUCTION = yargs.argv.prod;

const paths = {
  html: {
    nocopy: true,
    src: ['src/*.{html,php}'],
    dest: 'dist'
  },

  styles: {
    nocopy: true,
    src: ['src/assets/scss/bundle.scss'],
    dest: 'dist/assets/css'
  },

  images: {
    nocopy: true,
    src: 'src/assets/img/**/*.{jpg,jpeg,png,svg,gif}',
    dest: 'dist/assets/img'
  },

  favicons: {
    src: 'src/assets/favicons/*.{ico,jpg,jpeg,png,svg,gif}',
    dest: 'dist'
  },

  configFiles: {
    src: 'src/.config/**',
    dest: 'dist/.config'
  },

  vendor: {
    src: 'src/vendor/**',
    dest: 'dist/vendor'
  },

  lib: {
    src: 'src/lib/**',
    dest: 'dist/lib'
  },

  scripts: {
    nocopy: true,
    src: ['src/assets/js/bundle.js', 'src/assets/js/bundle_legal.js'],
    dest: 'dist/assets/js/'
  },

  otherFiles: {
    src: ['src/assets/**', '!src/assets/{favicons,scss,js,img}', '!src/assets/{favicons,scss,js,img}/**/*'],
    dest: 'dist/assets/'
  },

  htaccess_dev: {
    src: ['src/htaccess_dev/**'],
    dest: 'dist/htaccess_dev/'
  },

  htaccess_prod: {
    src: ['src/htaccess_prod/**'],
    dest: 'dist/htaccess_prod/'
  }
}

const server = browserSync.create();

export const serve = (done) => {
  server.init( {
    proxy: 'http://localhost:8888/site_fabian_fess_2.0.0/dist',
    browser: "google chrome"
  });
  done();
} 

export const reload = (done) => {
  server.reload();
  done();
}
// del takes in an array of files and folders
// and deletes them
export const clean = () => del(['dist']);

// copy and minimize images
export const images = () => {
  return gulp.src(paths.images.src)
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(gulp.dest(paths.images.dest));
}

function moveFiles(done) {
  for (let key in paths ) {
    if (!paths[key].nocopy) {
    gulp.src(paths[key].src, {dot: true})
      .pipe(gulp.dest(paths[key].dest))
    }
  }
  done()
}

// Copy favicons
export const favicons = () => {
  return gulp.src(paths.favicons.src)
    .pipe(gulp.dest(paths.favicons.dest));
}

// Copy configFiles
export const configFiles = () => {
  return gulp.src(paths.configFiles.src)
    .pipe(gulp.dest(paths.configFiles.dest));
}

// Copy vendor
export const vendor = () => {
  return gulp.src(paths.vendor.src)
    .pipe(gulp.dest(paths.vendor.dest));
}

// Copy lib
export const lib = () => {
  return gulp.src(paths.lib.src)
    .pipe(gulp.dest(paths.lib.dest));
}

// copy other files from assets folder
export const copyFiles = () => {
  return gulp.src(paths.otherFiles.src)
    .pipe(gulp.dest(paths.otherFiles.dest));
}

// copy htaccess_dev files
export const copyHtaccess = () => {
  return gulp.src(paths.htaccess_dev.src, {dot: true})
    .pipe(gulp.dest(paths.htaccess_dev.dest));
}

// copy htaccess_prod files
export const copyHtaccessProd = () => {
  return gulp.src(paths.htaccess_prod.src, {dot: true})
    .pipe(gulp.dest(paths.htaccess_prod.dest));
}

// Compile html from partials
export const compileHTML = () => {
  return gulp.src(paths.html.src)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(paths.html.dest));
}

// copile sass, bundle and minfy it and copy to dist
// use source maps in development
export const styles = () => {
  return gulp.src(paths.styles.src)
    // Use sourcemaps to show where css is coming from
    // Initialize sourcemaps
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    // Compile sass
    .pipe(sass().on('error', sass.logError))
    // Minify css, use gulp-if to only run, when --prod flag is set
    .pipe(gulpif(PRODUCTION, cleanCSS({compatibility: 'ie8'})))
    // Write sourcemaps
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest))
    // Inject css into browser
    .pipe(server.stream());
}

// bundle javascript, 
// transpile with babel
// minfy it and copy to dist
// use source maps in development
export const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(named())
    .pipe(webpackStream({
      mode: PRODUCTION ? 'production' : 'development',
      module: {
        rules: [
          { 
            test: /\.js$/,
            use: { 
              loader: 'babel-loader', 
              options: {
                presets: ['@babel/preset-env'] 
              }
            },
          }  
        ],
      },
      plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
      ],
      output: {
        filename: '[name].js'
      },
      devtool: !PRODUCTION ? 'inline-source-map' : false
    }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Define watch task
export const watch = () => {
  gulp.watch(['src/_partials/**/*.{html,php}'], gulp.series(compileHTML, reload));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series(styles));
  gulp.watch('src/assets/js/**/*.js', gulp.series(scripts, reload))
  gulp.watch('**/*.php', reload);
  gulp.watch(paths.images.src, gulp.series(images, reload));
  gulp.watch(paths.otherFiles.src, gulp.series(copyFiles, reload));
}

export const compress = () => {
  return gulp.src(paths.package.src)
    .pipe(replace('_themename', info.name))
    .pipe(zip(`${info.name}.zip`))
    .pipe(gulp.dest(paths.package.dest))
}

export const dev = gulp.series(clean, gulp.parallel(copyFiles, copyHtaccess, copyHtaccessProd, favicons, configFiles, vendor, lib, images, compileHTML, styles, scripts), serve, watch); // serve, watch)

export const build = gulp.series(clean, gulp.parallel(copyFiles, copyHtaccess, copyHtaccessProd, favicons, configFiles, vendor, lib, images, compileHTML, styles, scripts));

// export const build = gulp.series(clean, gulp.parallel(copyFiles, images, styles, scripts));
export const bundle = gulp.series(build, compress);

export const test = gulp.series(moveFiles);
// Define dev as default task
export default dev;


