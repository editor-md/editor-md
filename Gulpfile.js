// "use strict";

const gulp       = require("gulp");
const pkg        = require("./package.json");
const sass       = require('gulp-sass');
const dateFormat = require("js-dateFormat").dateFormat;
const os           = require("os");
const gutil        = require("gulp-util");
const rename       = require("gulp-rename");
const concat       = require("gulp-concat");
const notify       = require("gulp-notify");
const header       = require("gulp-header");
const minifycss    = require("gulp-minify-css");
const replace      = require("gulp-replace");
const uglify       = require('gulp-uglify');
const babel        = require("gulp-babel");
const order        = require("gulp-order");
const clean        = require("gulp-clean");
const ngModuleSort = require('gulp-ng-module-sort');

pkg.name = "Dup4.Editor.md";
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
    return scssTask("editormd"), 
           scssTask("editormd.preview"),
           scssTask("editormd.logo");
}

function pluginJs() {
    return gulp.src([
        "./src/lib/clipboard/clipboard.min.js",
        "./src/lib/clipboard/clipboard.use.min.js",
        "./src/lib/lazyload/lazyload.min.js",
        // "./src/lib/zoom/transition.min.js",
        // "./src/lib/zoom/zoom.min.js",
        "./src/lib/scriptaction/scriptaction.min.js",
    ])
    .pipe(ngModuleSort())
    .pipe(concat("plugins.min.js"))
    .pipe(gulp.dest("./js")); 
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
    .pipe(babel({
        presets: ['es2015'] // es5检查机制
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./js"))	
    .pipe(header(headerMiniComment, {pkg : pkg, fileName : function(file) {
        var name = file.path.split(file.base + ( (os.platform() === "win32") ? "\\" : "/") );
        return name[1].replace(/[\\\/]?/, "");
    }}))
    .pipe(gulp.dest("./js"));
}

const codeMirror = {
    path : {
        src : {
            mode : "lib/codemirror/mode",
            addon : "lib/codemirror/addon",
            keymap : "lib/codemirror/keymap"
        },
        dist : "lib/codemirror"
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

function cm_mode() {
    const modes = [
        codeMirror.path.src.mode + "/meta.js"
    ];
    for(var i in codeMirror.modes) {
        var mode = codeMirror.modes[i];
        modes.push(codeMirror.path.src.mode + "/" + mode + "/" + mode + ".js");
    }
    
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
    const addons = []
    for(var i in codeMirror.addons) {
        var addon = codeMirror.addons[i];
        addons.push(codeMirror.path.src.addon + "/" + addon + ".js");
    }
    
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
        .pipe(gulp.dest(dest))
        .pipe(uglify())
        .pipe(gulp.dest(dest))
}

function cm_lib() {
    return gulp.src(["./lib/codemirror/lib/*.css", 
    // "./lib/codemirror/addon/dialog/dialog.css", 
    // "./lib/codemirror/addon/search/matchesonscrollbar.css",
    // "./lib/codemirror/addon/fold/foldgutter.css"
])
    .pipe(concat("codemirror.min.css"))
    .pipe(gulp.dest(codeMirror.path.dist))
    .pipe(minifycss())
    .pipe(gulp.dest(codeMirror.path.dist)),
    gulp.src([
            // "./lib/codemirror/addon/addons.min.js",
            // "./lib/codemirror/mode/modes.min.js",
            "./lib/codemirror/lib/codemirror.js"
            ])
    .pipe(order([
        // "lib/codemirror/addon/addons.min.js",
        // "lib/codemirror/mode/modes.min.js",
        "lib/codemirror/lib/codemirror.js"
    ]))
    .pipe(concat("codemirror.min.js"))
    .pipe(gulp.dest(codeMirror.path.dist))
    .pipe(uglify())
    .pipe(gulp.dest(codeMirror.path.dist));
}

function cleanBuild() {
    return gulp.src("./build").pipe(clean()),
           gulp.src("./examples/editor.md").pipe(clean());
        //    gulp.src("../dup4.blog/client/public/editor.md").pipe(clean());
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
    return gulp.src("./build/**/*").pipe(gulp.dest("./examples/editor.md")),
           gulp.src("./build/**/*").pipe(gulp.dest("../dup4.blog/pc/public/editor.md")),
           gulp.src("./build/**/*").pipe(gulp.dest("../dup4.blog/mobile/public/editor.md")),
           gulp.src("./build/**/*").pipe(gulp.dest("../wiki/pc/public/editor.md"));
}

function pluginJSMin() {
    return (
        jsMini("./src/lib/scriptaction/scriptaction.js", "./src/lib/scriptaction"),
        // jsMini("./src/lib/lazyload/lazyload.js", "./src/lib/lazyload"),
        jsMini("./src/lib/clipboard/clipboard.use.js", "./src/lib/clipboard"),
        jsMini("./src/lib/marked/marked.js", "./src/lib/marked")
    );
}

exports.css = css;
exports.js = js;
exports.cm_mode = cm_mode;
exports.cm_addon = cm_addon;
exports.cm_lib = cm_lib;
exports.cleanBuild = cleanBuild;
exports.build = build;
exports.pluginJs = pluginJs;
exports.put = put;
exports.pluginJSMin = pluginJSMin;
exports.default = gulp.series(pluginJSMin, gulp.parallel(css, js, pluginJs), build, put);



