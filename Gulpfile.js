"use strict";
const gulp       = require("gulp");
const pkg        = require("./package.json");
const sass       = require('gulp-sass');
const dateFormat = require("js-dateFormat").dateFormat;
const os           = require("os");
const path         = require("path");
const gutil        = require("gulp-util");
const rename       = require("gulp-rename");
const concat       = require("gulp-concat");
const notify       = require("gulp-notify");
const header       = require("gulp-header");
const minifycss    = require("gulp-minify-css");
const replace      = require("gulp-replace");
const uglify       = require('gulp-uglify-es').default;
const babel        = require("gulp-babel");
const order        = require("gulp-order");
const clean        = require("gulp-clean");
const ngModuleSort = require('gulp-ng-module-sort');
const merge        = require('merge-stream');

pkg.name = "Editor-md";
pkg.today = dateFormat(new Date(), 'yyyy-mm-dd');

const headerComment = ["/*", 
					" * <%= pkg.name %>",
                    " *",
					" * @file        <%= fileName(file) %> ",
					" * @version     v<%= pkg.version %> ",
					" * @description <%= pkg.description %>",
					" * @license     MIT License",
					" * @author      <%= pkg.author %>",
					" * {@link       <%= pkg.homepage %>}",
					" * @updateTime  <%= pkg.today %>",
					" */", 
					"\r\n"].join("\r\n");

const headerMiniComment = "/*! <%= pkg.name %> v<%= pkg.version %> | <%= fileName(file) %> | <%= pkg.description %> | MIT License | By: <%= pkg.author %> | <%= pkg.homepage %> | <%=pkg.today %> */\r\n";

function cssMini(src, dest) {
    return gulp.src(src)
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(dest))
        .pipe(minifycss())
        .pipe(gulp.dest(dest)) 
}

function jsMini(src, dest) {
    return gulp.src(src)
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest(dest))
}

function scssTask(fileName, path) {
    
    path = path || "scss/";
    
    var distPath = "css";
    
    return gulp.src(path + fileName + ".scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(distPath))
        .pipe(header(headerComment, {pkg : pkg, fileName : function(file) { 
            var name = file.path.split(file.base);
            return name[1].replace("/", "");
        }}))
       .pipe(gulp.dest(distPath)) 
       .pipe(rename({ suffix: ".min" }))
       .pipe(gulp.dest(distPath))
       .pipe(minifycss())
       .pipe(gulp.dest(distPath)) 
       .pipe(header(headerMiniComment, {pkg : pkg, fileName : function(file) { 
            const name = file.path.split(file.base);
            return name[1].replace("/", "");
        }}))
       .pipe(gulp.dest(distPath)) 
       .pipe(notify({ message: fileName + ".scss task completed!" }));
};

function css() {
    return merge([
        "editormd",
        "editormd.preview",
        "editormd.logo",
    ].map(fileName => scssTask(fileName)));
}

function js() {
    return gulp.src([
        "./src/lib/marked/marked.min.js", 
        "./src/lib/prettify/prettify.min.js",
        "./src/editormd.js"
    ])
    .pipe(ngModuleSort())
    .pipe(concat("editormd.js"))
    .pipe(header(headerComment, {pkg : pkg, fileName : function(file) { 
        var name = file.path.split(file.base);
        return name[1].replace(/[\\\/]?/, "");
    }}))
    .pipe(gulp.dest("./js"))
    .pipe(rename({ suffix: ".min" }))
    // .pipe(babel({
    //     presets: ['es2015'] // es5检查机制
    // }))
    .pipe(uglify())
    .pipe(gulp.dest("./js"))	
    // .pipe(header(headerMiniComment, {pkg : pkg, fileName : function(file) {
    //     var name = file.path.split(file.base + ( (os.platform() === "win32") ? "\\" : "/") );
    //     return name[1].replace(/[\\\/]?/, "");
    // }}))
    // .pipe(gulp.dest("./js"));
}

function pluginJSMin() {
    return merge([
        {src:"./src/lib/scriptaction/scriptaction.js", dest:"./src/lib/scriptaction"},
        {src:"./src/lib/clipboard/clipboard.use.js", dest:"./src/lib/clipboard"},
        {src:"./src/lib/marked/marked.js", dest:"./src/lib/marked"},
    ].map(item => jsMini(item.src, item.dest)));
}

function pluginJs() {
    return gulp.src([
        "./src/lib/clipboard/clipboard.min.js",
        "./src/lib/clipboard/clipboard.use.min.js",
        "./src/lib/lazyload/lazyload.min.js",
        "./src/lib/scriptaction/scriptaction.min.js",
    ])
    .pipe(ngModuleSort())
    .pipe(uglify())
    .pipe(concat("plugins.min.js"))
    .pipe(gulp.dest("./js")); 
}

const codeMirror = {
    path : {
        src: "./src/lib/codemirror",
        dist : "./lib/codemirror"
    },
    modes : [
        "css",
        "sass",
        "shell",
        "sql",
        "clike",
        "php",
        "xml",
        "markdown",
        "javascript",
        "htmlmixed",
        "gfm",
        "http",
        "go",
        "dart",
        "coffeescript",
        "nginx",
        "python",
        "perl",
        "lua",
        "r", 
        "ruby", 
        "rst",
        "smarty",
        // "smartymixed",
        "vb",
        "vbscript",
        "velocity",
        "xquery",
        "yaml",
        "erlang",
        // "jade",
    ],
    addons : [
        "edit/trailingspace", 
        "dialog/dialog", 
        "search/searchcursor", 
        "search/search",
        "scroll/annotatescrollbar", 
        "search/matchesonscrollbar", 
        "display/placeholder", 
        "edit/closetag", 
        "fold/foldcode",
        "fold/foldgutter",
        "fold/indent-fold",
        "fold/brace-fold",
        "fold/xml-fold", 
        "fold/markdown-fold",
        "fold/comment-fold", 
        "mode/overlay", 
        "selection/active-line", 
        "edit/closebrackets", 
        "display/fullscreen", 
        "search/match-highlighter"
    ],
    keymaps: [
        "emacs",
        "sublime",
        "vim"
    ]
};

function cm_clean() {
    return gulp.src("./lib/codemirror/*").pipe(clean());
}

function cm_copy() {
    return merge([
        // "addon", 
        "keymap", 
        // "lib", 
        // "mode", 
        // "theme",
    ].map(item => {
        return gulp.src(path.join(codeMirror.path.src, item, "**/*"))
                   .pipe(gulp.dest(path.join(codeMirror.path.dist, item)));
    }));
}

function cm_mode() {
    const modePath = path.join(codeMirror.path.src, "mode");
    let modes = [
        path.join(modePath, "meta.js")
    ];
    modes = modes.concat(codeMirror.modes.map(mode => {
        return path.join(modePath, mode, `${mode}.js`);
    }));
    return gulp.src(modes)
                .pipe(concat("modes.min.js"))
                .pipe(gulp.dest(codeMirror.path.dist))
                .pipe(uglify()) // {outSourceMap: true, sourceRoot: codeMirror.path.dist}
                .pipe(gulp.dest(codeMirror.path.dist))	
                .pipe(header(headerMiniComment, {pkg : pkg, fileName : function(file) {
                    var name = file.path.split(file.base + "\\"); 
                    return (name[1]?name[1]:name[0]).replace(/\\/g, "");
                }}))
                .pipe(gulp.dest(codeMirror.path.dist))
                .pipe(notify({ message: "codemirror-mode task complete!" }));
}

function cm_addon() {
    const addonPath = path.join(codeMirror.path.src, "addon");
    let addons = [];
    addons = addons.concat(codeMirror.addons.map(addon => {
        return path.join(addonPath, `${addon}.js`);
    }));
    return gulp.src(addons)
                .pipe(concat("addons.min.js"))
                .pipe(gulp.dest(codeMirror.path.dist))
                .pipe(uglify()) //{outSourceMap: true, sourceRoot: codeMirror.path.dist}
                .pipe(gulp.dest(codeMirror.path.dist))	
                .pipe(header(headerMiniComment, {pkg : pkg, fileName : function(file) {
                    var name = file.path.split(file.base + "\\");
                    return (name[1]?name[1]:name[0]).replace(/\\/g, "");
                }}))
                .pipe(gulp.dest(codeMirror.path.dist))
                .pipe(notify({ message: "codemirror-addon.js task complete" }));
} 

function cm_lib() {
    return merge([
        gulp.src([
            path.join(codeMirror.path.src, "lib/codemirror.css"),
            path.join(codeMirror.path.src, "addon/**/*.css"),
        // "./lib/codemirror/addon/dialog/dialog.css", 
        // "./lib/codemirror/addon/search/matchesonscrollbar.css",
        // "./lib/codemirror/addon/fold/foldgutter.css"
        ])
        .pipe(concat("codemirror.min.css"))
        .pipe(gulp.dest(codeMirror.path.dist))
        .pipe(minifycss())
        .pipe(gulp.dest(codeMirror.path.dist)),
        gulp.src([
                path.join(codeMirror.path.src, "lib/codemirror.js"),
                path.join(codeMirror.path.dist, "addons.min.js"),
                path.join(codeMirror.path.dist, "modes.min.js"),
        ])
        .pipe(ngModuleSort())
        .pipe(concat("codemirror.min.js"))
        .pipe(gulp.dest(codeMirror.path.dist))
        .pipe(uglify())
        .pipe(gulp.dest(codeMirror.path.dist)),
    ]);
}

function cm_clean_after() {
    return gulp.src([
        path.join(codeMirror.path.dist, "addons.min.js"),
        path.join(codeMirror.path.dist, "modes.min.js"),
    ]).pipe(clean({force:true}));
}

function mathjax_build() {
    return gulp.src("./src/lib/mathjax/**/*").pipe(gulp.dest("./lib/mathjax"));
}

function cleanBuild() {
    return merge([
        "./build/*",
        "./examples/editor.md/*",
        "../dup4.blog/pc/public/editor.md/*",
        "../dup4.blog/mobile/public/editor.md/*",
        "../wiki/pc/public/editor.md/*",
    ].map(item => {
        return gulp.src(item).pipe(clean({force:true}));
    }));
}

function build() {
    return gulp.src("./css/**/*.min.css").pipe(gulp.dest("./build/css")),
           gulp.src("./js/*.min.js").pipe(gulp.dest("./build/js")),
           gulp.src("./fonts/**/*").pipe(gulp.dest("./build/fonts")),
           gulp.src("./images/**/*").pipe(gulp.dest("./build/images")),
           gulp.src(["./plugins/**/*", "!./plugins/**/*.js"]).pipe(gulp.dest("./build/plugins")),
           gulp.src("./plugins/**/*.js")
           .pipe(uglify())
           .pipe(gulp.dest("./build/plugins")),
           gulp.src("./lib/**/*").pipe(gulp.dest("./build/lib"));
}

function put() {
    return merge([
        "./examples/editor.md",
        "../dup4.blog/pc/public/editor.md",
        "../dup4.blog/mobile/public/editor.md",
        "../wiki/pc/public/editor.md",
    ].map(item => {
        return gulp.src("./build/**/*").pipe(gulp.dest(item));
    }));
}

exports.cm_clean = cm_clean;
exports.cm_copy = cm_copy;
exports.cm_mode = cm_mode;
exports.cm_addon = cm_addon;
exports.cm_lib = cm_lib;
exports.cm_clean_after = cm_clean_after;
exports.cm_build = gulp.series(
    cm_clean, 
    gulp.parallel(cm_copy, cm_mode, cm_addon), 
    cm_lib,
    cm_clean_after,
);

exports.mathjax_build = mathjax_build;

exports.css = css;
exports.js = js;
exports.pluginJs = pluginJs;

exports.cleanBuild = cleanBuild;
exports.pluginJSMin = pluginJSMin;
exports.build = build;
exports.put = put;
exports.default = gulp.series(
    cleanBuild,
    pluginJSMin, 
    gulp.parallel(css, js, pluginJs), 
    build, 
    // put
);



