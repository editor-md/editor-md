;(function(factory) {
    "use strict";

	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    {
        module.exports = factory;
    }
	else if (typeof define === "function")  // AMD/CMD/Sea.js
	{
        if (define.amd) // for Require.js
        {
            /* Require.js define replace */
        }
        else
        {
		    define(["jquery"], factory);  // for Sea.js
        }
	}
	else
	{
        window.editormd = factory();
	}

}(function() {

    /* Require.js assignment replace */

    "use strict";

    var $ = (typeof (jQuery) !== "undefined") ? jQuery : Zepto;

	if (typeof ($) === "undefined") {
		return ;
	}

    /**
     * editormd
     *
     * @param   {String} id           编辑器的ID
     * @param   {Object} options      配置选项 Key/Value
     * @returns {Object} editormd     返回editormd对象
     */

    var editormd         = function (id, options) {
        return new editormd.fn.init(id, options);
    };

    editormd.title        = editormd.$name = "Editor-md";
    editormd.version      = "2.0.0";
    editormd.homePage     = "https://github.com/Editor-md/Editor-md";
    editormd.classPrefix  = "editormd-";

    editormd.toolbarModes = {
        full : [
            "undo", "redo", "|",
            "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
            "h1", "h2", "h3", "h4", "h5", "h6", "|",
            "list-ul", "list-ol", "hr", "|",
            "link", "reference-link", "image", "file", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
            "goto-line", "watch", "preview", "fullscreen", "clear", "|",
            "help", "info", "options"
        ],
        simple : [
            "undo", "redo", "|",
            "bold", "del", "italic", "quote", "table", "image", "file", "|",
            "watch", "preview", "fullscreen", "|",
            "extend_html", "help", "options"
        ],
        mini : [
            "undo", "redo", "|",
            "image", "preview", "help", "options", 
        ]
    };

    editormd.defaults     = {
        mode                 : "gfm",          //gfm or markdown
        name                 : "",             // Form element name
        value                : "",             // value for CodeMirror, if mode not gfm/markdown
        theme                : "",             // Editor.md self themes, before v1.5.0 is CodeMirror theme, default empty
        editorTheme          : "default",      // Editor area, this is CodeMirror theme at v1.5.0
        previewTheme         : "",             // Preview area theme, default empty
        markdown             : "",             // Markdown source code
        appendMarkdown       : "",             // if in init textarea value not empty, append markdown to textarea
        width                : "100%",
        height               : "100%",
        path                 : "./lib/",       // Dependents module file directory
        pluginPath           : "",             // If this empty, default use settings.path + "../plugins/"
        delay                : 3000,           // Max Delay parse markdown to html, Uint : ms
        autoLoadModules      : true,           // Automatic load dependent module files
        watch                : false,
        placeholder          : "Enjoy Markdown! use $e^x$ in Latex.",
        gotoLine             : true,
        codeFold             : true,
        autoHeight           : false,
		autoFocus            : false,     
        autoCloseTags        : false,
        searchReplace        : true,
        syncScrolling        : "single",           // true | false | "single", default true
        readOnly             : false,
        tabSize              : 4,
		indentUnit           : 4,
        lineNumbers          : true,
		lineWrapping         : true,          // 一行超出宽度是否延伸到下一行 默认为false
		autoCloseBrackets    : true,
		showTrailingSpace    : true,
		matchBrackets        : true,
		indentWithTabs       : true,
		styleSelectedText    : true,
        matchWordHighlight   : true,           // options: true, false, "onselected"
        styleActiveLine      : true,           // Highlight the current line
        dialogLockScreen     : false,           // 设置弹出层对话框不锁屏，全局通用，默认为true
        dialogShowMask       : true,           // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        dialogDraggable      : true,           // 设置弹出层对话框不可拖动，全局通用，默认为true
        dialogMaskBgColor    : "#fff",         // 设置透明遮罩层的透明度，全局通用，默认值为0.1
        dialogMaskOpacity    : 0.1,            // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
        fontSize             : "14px",
        saveHTMLToTextarea   : true,
        disabledKeyMaps      : [],
        keymapMode           : "default",

        onload               : function() {},
        onresize             : function() {},
        onchange             : function() {},
        onwatch              : null,
        onunwatch            : null,
        onpreviewing         : function() {},
        onpreviewed          : function() {},
        onfullscreen         : function() {},
        onfullscreenExit     : function() {},
        onscroll             : function() {},
        onpreviewscroll      : function() {},

        imageUpload          : false,
        fileUpload           : false,
        // imageFormats         : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageFormats         : ["jpg", "jpeg", "gif", "png"],
        uploadURL            : "",
        uploadToken          : "",
        crossDomainUpload    : false,
        uploadCallbackURL    : "",
        imageLazyLoad        : false,     // 图片是否需要懒加载优化，默认为true
        imageLazyLoadLoadingICON: `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`,


        toc                  : true,           // Table of contents
        tocm                 : false,           // Using [TOCM], auto create ToC dropdown menu
        tocTitle             : "",             // for ToC dropdown menu btn
        tocDropdown          : false,
        tocContainer         : "",
        tocStartLevel        : 1,              // Said from H1 to create ToC
        // htmlDecode           : "style,script,iframe|on*",          // Open the HTML tag identification
        htmlDecode           : "style,script,iframe",          // Open the HTML tag identification 
        pageBreak            : false,           // Enable parse page break [========]
        atLink               : false,           // for @link
        emailLink            : true,           // for email address auto link
        taskList             : true,          // Enable Github Flavored Markdown task lists
        emoji                : false,          // :emoji: , Support Github emoji, Twitter Emoji (Twemoji);
                                               // Support FontAwesome icon emoji :fa-xxx: > Using fontAwesome icon web fonts;
                                               // Support Editor.md logo icon emoji :editormd-logo: :editormd-logo-1x: > 1~8x;
        tex                  : true,          // TeX(LaTeX), based on KaTeX
        texHostUrl           : "",            //MathJax CSS文件中的字体路径替换URL
        texTargetUrl         : "",            // MathJax CSS 文件中的字体路径替换目标URL
        flowChart            : false,          // flowChart.js only support IE9+
        sequenceDiagram      : false,          // sequenceDiagram.js only support IE9+
        previewCodeHighlight : true,

        toolbar              : true,           // show/hide toolbar
        toolbarAutoFixed     : false,           // on window scroll auto fixed position
        toolbarIcons         : "simple",
        toolbarTitles        : {},
        toolbarHandlers      : {
            ucwords : function() {
                return editormd.toolbarHandlers.ucwords;
            },
            lowercase : function() {
                return editormd.toolbarHandlers.lowercase;
            }
        },
        toolbarCustomIcons   : {               // using html tag create toolbar icon, unused default <a> tag.
            lowercase        : "<a href=\"javascript:;\" title=\"Lowercase\" unselectable=\"on\"><i class=\"fa\" name=\"lowercase\" style=\"font-size:24px;margin-top: -10px;\">a</i></a>",
            "ucwords"        : "<a href=\"javascript:;\" title=\"ucwords\" unselectable=\"on\"><i class=\"fa\" name=\"ucwords\" style=\"font-size:20px;margin-top: -3px;\">Aa</i></a>"
        },
        toolbarIconsClass    : {
            undo             : "fa-undo",
            redo             : "fa-repeat",
            bold             : "fa-bold",
            del              : "fa-strikethrough",
            italic           : "fa-italic",
            quote            : "fa-quote-left",
            uppercase        : "fa-font",
            h1               : editormd.classPrefix + "bold",
            h2               : editormd.classPrefix + "bold",
            h3               : editormd.classPrefix + "bold",
            h4               : editormd.classPrefix + "bold",
            h5               : editormd.classPrefix + "bold",
            h6               : editormd.classPrefix + "bold",
            "list-ul"        : "fa-list-ul",
            "list-ol"        : "fa-list-ol",
            hr               : "fa-minus",
            link             : "fa-link",
            "reference-link" : "fa-anchor",
            image            : "fa-picture-o",
            file             : "fa-upload",
            code             : "fa-code",
            "preformatted-text" : "fa-file-code-o",
            "code-block"     : "fa-file-code-o",
            table            : "fa-table",
            datetime         : "fa-clock-o",
            emoji            : "fa-smile-o",
            "html-entities"  : "fa-copyright",
            pagebreak        : "fa-newspaper-o",
            "goto-line"      : "fa-terminal", // fa-crosshairs
            watch            : "fa-eye-slash",
            unwatch          : "fa-eye",
            preview          : "fa-desktop",
            search           : "fa-search",
            fullscreen       : "fa-arrows-alt",
            clear            : "fa-eraser",
            help             : "fa-question-circle",
            info             : "fa-info-circle",
            options          : "fa-gear",
            extend_html      : "fa-th-large",
        },
        toolbarIconTexts     : {},

        lang : {
            name        : "zh-cn",
            description : "开源在线Markdown编辑器<br/>Open source online Markdown editor.",
            tocTitle    : "目录",
            toolbar     : {
                undo             : "撤销（Ctrl+Z）",
                redo             : "重做（Ctrl+Y）",
                bold             : "粗体",
                del              : "删除线",
                italic           : "斜体",
                quote            : "引用",
                ucwords          : "将每个单词首字母转成大写",
                uppercase        : "将所选转换成大写",
                lowercase        : "将所选转换成小写",
                h1               : "标题1",
                h2               : "标题2",
                h3               : "标题3",
                h4               : "标题4",
                h5               : "标题5",
                h6               : "标题6",
                "list-ul"        : "无序列表",
                "list-ol"        : "有序列表",
                hr               : "横线",
                link             : "链接",
                "reference-link" : "引用链接",
                image            : "添加图片",
                file             : "上传附件",
                code             : "行内代码",
                "preformatted-text" : "预格式文本 / 代码块（缩进风格）",
                "code-block"     : "代码块（多语言风格）",
                table            : "添加表格",
                datetime         : "日期时间",
                emoji            : "Emoji表情",
                "html-entities"  : "HTML实体字符",
                pagebreak        : "插入分页符",
                "goto-line"      : "跳转到行",
                watch            : "关闭实时预览",
                unwatch          : "开启实时预览",
                preview          : "全窗口预览HTML",
                fullscreen       : "全屏（按ESC还原）",
                clear            : "清空",
                search           : "搜索",
                help             : "使用帮助",
                info             : "关于" + editormd.title,
                options          : "编辑器配置",
                extend_html      : "扩展语法",
            },
            buttons : {
                enter  : "确定",
                cancel : "取消",
                close  : "关闭"
            },
            dialog : {
                link : {
                    title    : "添加链接",
                    url      : "链接地址",
                    urlTitle : "链接标题",
                    urlEmpty : "错误：请填写链接地址。"
                },
                referenceLink : {
                    title    : "添加引用链接",
                    name     : "引用名称",
                    url      : "链接地址",
                    urlId    : "链接ID",
                    urlTitle : "链接标题",
                    nameEmpty: "错误：引用链接的名称不能为空。",
                    idEmpty  : "错误：请填写引用链接的ID。",
                    urlEmpty : "错误：请填写引用链接的URL地址。"
                },
                image : {
                    title    : "添加图片",
                    url      : "图片地址",
                    link     : "图片链接",
                    alt      : "图片描述",
                    uploadButton     : "本地上传",
                    imageURLEmpty    : "错误：图片地址不能为空。",
                    uploadFileEmpty  : "错误：上传的图片不能为空。",
                    formatNotAllowed : "错误：只允许上传图片文件，允许上传的图片文件格式有：",
                    imageOverSize    : "错误：只允许上传16MB及以下的图片文件。"
                },
                file : {
                    title : "上传附件",
                    url   : "附件地址",
                    alt   : "附件描述",
                    uploadButton : "本地上传",
                    fileURLEmpty : "错误：附件地址不能唯恐。",
                    uploadFileEmpty : "错误：上传的附件不能唯恐。",
                },
                preformattedText : {
                    title             : "添加预格式文本或代码块",
                    emptyAlert        : "错误：请填写预格式文本或代码的内容。"
                },
                codeBlock : {
                    title             : "添加代码块",
                    selectLabel       : "代码语言：",
                    selectDefaultText : "请选择代码语言",
                    otherLanguage     : "其他语言",
                    unselectedLanguageAlert : "错误：请选择代码所属的语言类型。",
                    codeEmptyAlert    : "错误：请填写代码内容。"
                },
                htmlEntities : {
                    title : "HTML 实体字符"
                },
                help : {
                    title : "使用帮助"
                }
            }
        }
    };

    editormd.classNames  = {
        tex : editormd.classPrefix + "tex"
    };

    editormd.dialogZindex = 99999;

    editormd.$katex       = null;
    editormd.$marked      = null;
    editormd.$CodeMirror  = null;
    editormd.$prettyPrint = null;

    var timer, flowchartTimer, elapsedSaveTime = 500, cacheKeymaps;

    editormd.prototype    = editormd.fn = {

        state : {
            watching   : false,
            loaded     : false,
            preview    : false,
            fullscreen : false
        },

        /**
         * 构造函数/实例初始化
         * Constructor / instance initialization
         *
         * @param   {String}   id            编辑器的ID
         * @param   {Object}   [options={}]  配置选项 Key/Value
         * @returns {editormd}               返回editormd的实例对象
         */

        init : function (id, options) {

            options              = options || {};

            if (typeof id === "object")
            {
                options = id;
            }

            var _this            = this;
            var classPrefix      = this.classPrefix  = editormd.classPrefix;
            var settings         = this.settings     = $.extend(true, editormd.defaults, options);

            // 图片/文件 上传缓冲区
            this.uploadImg  = new Array();
            this.uploadFile = new Array();

            id                   = (typeof id === "object") ? settings.id : id;

            var editor           = this.editor       = $("#" + id);

            this.id              = id;
            this.lang            = settings.lang;

            var classNames       = this.classNames   = {
                textarea : {
                    html     : classPrefix + "html-textarea",
                    markdown : classPrefix + "markdown-textarea"
                }
            };

            settings.pluginPath = (settings.pluginPath === "") ? settings.path + "../plugins/" : settings.pluginPath;

            this.state.watching = (settings.watch) ? true : false;

            if ( !editor.hasClass("editormd") ) {
                editor.addClass("editormd");
            }

            editor.css({
                width  : (typeof settings.width  === "number") ? settings.width  + "px" : settings.width,
                height : (typeof settings.height === "number") ? settings.height + "px" : settings.height
            });

            if (settings.autoHeight)
            {
                editor.css("height", "auto");
            }

            var markdownTextarea = this.markdownTextarea = editor.children("textarea");

            if (markdownTextarea.length < 1)
            {
                editor.append("<textarea></textarea>");
                markdownTextarea = this.markdownTextarea = editor.children("textarea");
            }

            markdownTextarea.addClass(classNames.textarea.markdown).attr("placeholder", settings.placeholder);

            if (typeof markdownTextarea.attr("name") === "undefined" || markdownTextarea.attr("name") === "")
            {
                markdownTextarea.attr("name", (settings.name !== "") ? settings.name : id + "-markdown-doc");
            }

            var appendElements = [
                (!settings.readOnly) ? "<a href=\"javascript:;\" class=\"fa fa-close " + classPrefix + "preview-close-btn\"></a>" : "",
                ( (settings.saveHTMLToTextarea) ? "<textarea class=\"" + classNames.textarea.html + "\" name=\"" + id + "-html-code\"></textarea>" : "" ),
                "<div class=\"" + classPrefix + "preview\"><div class=\"markdown-body " + classPrefix + "preview-container\"></div></div>",
                "<div class=\"" + classPrefix + "container-mask\" style=\"display:block;\"></div>",
                "<div class=\"" + classPrefix + "mask\"></div>"
            ].join("\n");

            editor.append(appendElements).addClass(classPrefix + "vertical");

            if (settings.theme !== "")
            {
                editor.addClass(classPrefix + "theme-" + settings.theme);
            }

            this.mask          = editor.children("." + classPrefix + "mask");
            this.containerMask = editor.children("." + classPrefix  + "container-mask");

            if (settings.markdown !== "")
            {
                markdownTextarea.val(settings.markdown);
            }

            if (settings.appendMarkdown !== "")
            {
                markdownTextarea.val(markdownTextarea.val() + settings.appendMarkdown);
            }

            this.htmlTextarea     = editor.children("." + classNames.textarea.html);
            this.preview          = editor.children("." + classPrefix + "preview");
            this.previewContainer = this.preview.children("." + classPrefix + "preview-container");

            if (settings.previewTheme !== "")
            {
                this.preview.addClass(classPrefix + "preview-theme-" + settings.previewTheme);
            }

            if (typeof define === "function" && define.amd)
            {
                // if (typeof katex !== "undefined")
                // {
                //     editormd.$katex = katex;
                // }

                if (settings.searchReplace && !settings.readOnly)
                {
                    editormd.loadCSS(settings.path + "codemirror/addon/dialog/dialog");
                    editormd.loadCSS(settings.path + "codemirror/addon/search/matchesonscrollbar");
                }
            }

            if ((typeof define === "function" && define.amd) || !settings.autoLoadModules)
            {
                if (typeof CodeMirror !== "undefined") {
                    editormd.$CodeMirror = CodeMirror;
                }

                if (typeof marked     !== "undefined") {
                    editormd.$marked     = marked;
                }

                this.setCodeMirror().setToolbar().loadedDisplay();
            }
            else
            {
                this.loadQueues();
            }
            
            var initPasteDrag = function(Editor) {
                var doc = document.getElementById(Editor.id);
                if (!doc) return;
                var upload = function(file) {
                    var suffix = file.type.split("/");
                    suffix = suffix[suffix.length - 1];
                    if ($.inArray(suffix, Editor.settings.imageFormats) !== -1) {
                        if (settings.imageUpload) {
                            Editor.uploadImg.push(file);
                            Editor.executePlugin("imageDialog", "image-dialog/image-dialog");    
                        }
                    } else {
                        if (settings.fileUpload) {
                            Editor.uploadFile.push(file);
                            Editor.executePlugin("fileDialog", "file-dialog/file-dialog");
                        }
                    }
                }
                doc.addEventListener('paste', function (event) {
                    var items = (event.clipboardData || window.clipboardData).items;
                    var file = null;
                    if (items && items.length) {
                        for (var i = 0; !file && i < items.length; ++i) {
                            file = items[i].getAsFile();
                        }
                    }
                    if (!file) {
                        console.log("当前浏览器不支持");
                        return;
                    }
                    upload(file);
                });

                var dashboard = document.getElementById(Editor.id);
                dashboard.addEventListener("dragover", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                dashboard.addEventListener("dragenter", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                dashboard.addEventListener("drop", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var files = this.files || e.dataTransfer.files;
                    var file = files[0];
                    if (!file) {
                        console.log("当前浏览器不支持");
                        return;
                    }
                    upload(file);
                });
            };

            initPasteDrag(this); 
            return this;
        },

        /**
         * 所需组件加载队列
         * Required components loading queue
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        loadQueues : function() {
            var _this        = this;
            var settings     = this.settings;
            var loadPath     = settings.path;

            var loadFlowChartOrSequenceDiagram = function() {

                _this.loadedDisplay();
                return;

                // if (editormd.isIE8)
                // {
                //     _this.loadedDisplay();

                //     return ;
                // }

                // if (settings.flowChart || settings.sequenceDiagram)
                // {

                //     editormd.loadScript(loadPath + "raphael.min", function() {

                //         editormd.loadScript(loadPath + "underscore.min", function() {

                //             if (!settings.flowChart && settings.sequenceDiagram)
                //             {
                //                 editormd.loadScript(loadPath + "sequence-diagram.min", function() {
                //                     _this.loadedDisplay();
                //                 });
                //             }
                //             else if (settings.flowChart && !settings.sequenceDiagram)
                //             {
                //                 editormd.loadScript(loadPath + "flowchart.min", function() {
                //                     editormd.loadScript(loadPath + "jquery.flowchart.min", function() {
                //                         _this.loadedDisplay();
                //                     });
                //                 });
                //             }
                //             else if (settings.flowChart && settings.sequenceDiagram)
                //             {
                //                 editormd.loadScript(loadPath + "flowchart.min", function() {
                //                     editormd.loadScript(loadPath + "jquery.flowchart.min", function() {
                //                         editormd.loadScript(loadPath + "sequence-diagram.min", function() {
                //                             _this.loadedDisplay();
                //                         });
                //                     });
                //                 });
                //             }
                //         });

                //     });
                // }
                // else
                // {
                //     _this.loadedDisplay();
                // }
            };

            editormd.loadCSS(loadPath + "codemirror/codemirror.min");


            //所有CSS合并了
            // if (settings.searchReplace && !settings.readOnly) {
            //     editormd.loadCSS(loadPath + "codemirror/addon/dialog/dialog");
            //     editormd.loadCSS(loadPath + "codemirror/addon/search/matchesonscrollbar");
            // }

            // if (settings.codeFold) {
            //     editormd.loadCSS(loadPath + "codemirror/addon/fold/foldgutter");
            // }

            editormd.loadScript(loadPath + "codemirror/codemirror.min", function() {
                editormd.$CodeMirror = CodeMirror;
                // editormd.loadScript(loadPath + "codemirror/modes.min", function() {
                    // editormd.loadScript(loadPath + "codemirror/addons.min", function() {
                        editormd.loadScript(loadPath + "../js/plugins.min", function() {
                            var funLoad = function () {
                                _this.setCodeMirror();
                                if (settings.mode !== "gfm" && settings.mode !== "markdown") {
                                    _this.loadedDisplay();
                                    return false;
                                }
                                _this.setToolbar();
                                editormd.$marked = marked;
                                _this.loadedDisplay();
                                // loadFlowChartOrSequenceDiagram();
                            };
                            if (settings.tex) {
                                editormd.loadMathJax(loadPath);
                            }
                            if (settings.keymapMode !== "default") {
                                editormd.loadScript(loadPath + "codemirror/keymap/" + settings.keymapMode, function() {
                                    funLoad();
                                });
                            } else {
                                funLoad();
                            }
                        });
                    });
                // });
            // });

            return this;
        },

        /**
         * 设置 Editor.md 的整体主题，主要是工具栏
         * Setting Editor.md theme
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setTheme : function(theme) {
            var editor      = this.editor;
            var oldTheme    = this.settings.theme;
            var themePrefix = this.classPrefix + "theme-";

            editor.removeClass(themePrefix + oldTheme).addClass(themePrefix + theme);

            this.settings.theme = theme;

            return this;
        },

        /**
         * 设置 CodeMirror（编辑区）的主题
         * Setting CodeMirror (Editor area) theme
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setEditorTheme : function(theme) {
            var settings   = this.settings;
            settings.editorTheme = theme;

            if (theme !== "default")
            {
                editormd.loadCSS(settings.path + "codemirror/theme/" + settings.editorTheme);
            }

            this.cm.setOption("theme", theme);

            return this;
        },

        /**
         * setEditorTheme() 的别名
         * setEditorTheme() alias
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setCodeMirrorTheme : function (theme) {
            this.setEditorTheme(theme);

            return this;
        },

        /**
         * 设置 Editor.md 的主题
         * Setting Editor.md theme
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setPreviewTheme : function(theme) {
            var preview     = this.preview;
            var oldTheme    = this.settings.previewTheme;
            var themePrefix = this.classPrefix + "preview-theme-";

            preview.removeClass(themePrefix + oldTheme).addClass(themePrefix + theme);

            this.settings.previewTheme = theme;

            return this;
        },

        /**
         * 设置键盘映射模式
         * Setting Keymap mode
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setKeymapMode : function(mode) {
            var _this      = this;
            var settings   = this.settings;
            settings.keymapMode = mode;

            if (mode !== "default")
            {
                editormd.loadScript(settings.path + "codemirror/keymap/" + settings.keymapMode, function() {
                    _this.cm.setOption("keyMap", mode);
                });
            }
            else
            {
                _this.cm.setOption("keyMap", mode);
            }

            return this;
        },

        /**
         * 配置和初始化CodeMirror组件
         * CodeMirror initialization
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setCodeMirror : function() {
            var settings         = this.settings;
            var editor           = this.editor;

            if (settings.editorTheme !== "default")
            {
                editormd.loadCSS(settings.path + "codemirror/theme/" + settings.editorTheme);
            }

            var codeMirrorConfig = {
                mode                      : settings.mode,
                theme                     : settings.editorTheme,
                tabSize                   : settings.tabSize,
                dragDrop                  : true,
                autofocus                 : settings.autoFocus,
                autoCloseTags             : settings.autoCloseTags,
                readOnly                  : (settings.readOnly) ? "nocursor" : false,
                indentUnit                : settings.indentUnit,
                lineNumbers               : settings.lineNumbers,
                lineWrapping              : settings.lineWrapping,
                extraKeys                 : {
                                                "Ctrl-Q": function(cm) {
                                                    cm.foldCode(cm.getCursor());
                                                }
                                            },
                foldGutter                : settings.codeFold,
                gutters                   : ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                matchBrackets             : settings.matchBrackets,
                indentWithTabs            : settings.indentWithTabs,
                styleActiveLine           : settings.styleActiveLine,
                styleSelectedText         : settings.styleSelectedText,
                autoCloseBrackets         : settings.autoCloseBrackets,
                showTrailingSpace         : settings.showTrailingSpace,
                highlightSelectionMatches : ( (!settings.matchWordHighlight) ? false : { showToken: (settings.matchWordHighlight === "onselected") ? false : /\w/ } ),
                scrollPastEnd             : true,
                smartIndent               : false,    // 智能tab
            };

            this.codeEditor = this.cm        = editormd.$CodeMirror.fromTextArea(this.markdownTextarea[0], codeMirrorConfig);
            this.codeMirror = this.cmElement = editor.children(".CodeMirror");

            if (settings.value !== "")
            {
                this.cm.setValue(settings.value);
            }

            this.codeMirror.css({
                fontSize : settings.fontSize,
                width    : (!settings.watch) ? "100%" : "50%"
            });

            if (settings.autoHeight)
            {
                this.codeMirror.css("height", "auto");
                this.cm.setOption("viewportMargin", Infinity);
            }

            if (!settings.lineNumbers)
            {
                this.codeMirror.find(".CodeMirror-gutters").css("border-right", "none");
            }
            return this;
        },

        /**
         * 获取CodeMirror的配置选项
         * Get CodeMirror setting options
         *
         * @returns {Mixed}                  return CodeMirror setting option value
         */

        getCodeMirrorOption : function(key) {
            return this.cm.getOption(key);
        },

        /**
         * 配置和重配置CodeMirror的选项
         * CodeMirror setting options / resettings
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setCodeMirrorOption : function(key, value) {

            this.cm.setOption(key, value);

            return this;
        },

        /**
         * 添加 CodeMirror 键盘快捷键
         * Add CodeMirror keyboard shortcuts key map
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        addKeyMap : function(map, bottom) {
            this.cm.addKeyMap(map, bottom);

            return this;
        },

        /**
         * 移除 CodeMirror 键盘快捷键
         * Remove CodeMirror keyboard shortcuts key map
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        removeKeyMap : function(map) {
            this.cm.removeKeyMap(map);

            return this;
        },

        /**
         * 跳转到指定的行
         * Goto CodeMirror line
         *
         * @param   {String|Intiger}   line      line number or "first"|"last"
         * @returns {editormd}                   返回editormd的实例对象
         */

        gotoLine : function (line) {

            var settings = this.settings;

            if (!settings.gotoLine)
            {
                return this;
            }

            var cm       = this.cm;
            var editor   = this.editor;
            var count    = cm.lineCount();
            var preview  = this.preview;

            if (typeof line === "string")
            {
                if(line === "last")
                {
                    line = count;
                }

                if (line === "first")
                {
                    line = 1;
                }
            }

            if (typeof line !== "number")
            {
                alert("Error: The line number must be an integer.");
                return this;
            }

            line  = parseInt(line) - 1;

            if (line > count)
            {
                alert("Error: The line number range 1-" + count);

                return this;
            }

            cm.setCursor( {line : line, ch : 0} );

            var scrollInfo   = cm.getScrollInfo();
            var clientHeight = scrollInfo.clientHeight;
            var coords       = cm.charCoords({line : line, ch : 0}, "local");

            cm.scrollTo(null, (coords.top + coords.bottom - clientHeight) / 2);

            if (settings.watch)
            {
                this.syncPreviewScrolling();
            }

            cm.focus();

            return this;
        },

        /**
         * 扩展当前实例对象，可同时设置多个或者只设置一个
         * Extend editormd instance object, can mutil setting.
         *
         * @returns {editormd}                  this(editormd instance object.)
         */

        extend : function() {
            if (typeof arguments[1] !== "undefined")
            {
                if (typeof arguments[1] === "function")
                {
                    arguments[1] = $.proxy(arguments[1], this);
                }

                this[arguments[0]] = arguments[1];
            }

            if (typeof arguments[0] === "object" && typeof arguments[0].length === "undefined")
            {
                $.extend(true, this, arguments[0]);
            }

            return this;
        },

        /**
         * 设置或扩展当前实例对象，单个设置
         * Extend editormd instance object, one by one
         *
         * @param   {String|Object}   key       option key
         * @param   {String|Object}   value     option value
         * @returns {editormd}                  this(editormd instance object.)
         */

        set : function (key, value) {

            if (typeof value !== "undefined" && typeof value === "function")
            {
                value = $.proxy(value, this);
            }

            this[key] = value;

            return this;
        },

        /**
         * 重新配置
         * Resetting editor options
         *
         * @param   {String|Object}   key       option key
         * @param   {String|Object}   value     option value
         * @returns {editormd}                  this(editormd instance object.)
         */

        config : function(key, value) {
            var settings = this.settings;

            if (typeof key === "object")
            {
                settings = $.extend(true, settings, key);
            }

            if (typeof key === "string")
            {
                settings[key] = value;
            }

            this.settings = settings;
            this.recreate();

            return this;
        },

        /**
         * 注册事件处理方法
         * Bind editor event handle
         *
         * @param   {String}     eventType      event type
         * @param   {Function}   callback       回调函数
         * @returns {editormd}                  this(editormd instance object.)
         */

        on : function(eventType, callback) {
            var settings = this.settings;

            if (typeof settings["on" + eventType] !== "undefined")
            {
                settings["on" + eventType] = $.proxy(callback, this);
            }

            return this;
        },

        /**
         * 解除事件处理方法
         * Unbind editor event handle
         *
         * @param   {String}   eventType          event type
         * @returns {editormd}                    this(editormd instance object.)
         */

        off : function(eventType) {
            var settings = this.settings;

            if (typeof settings["on" + eventType] !== "undefined")
            {
                settings["on" + eventType] = function(){};
            }

            return this;
        },

        /**
         * 显示工具栏
         * Display toolbar
         *
         * @param   {Function} [callback=function(){}] 回调函数
         * @returns {editormd}  返回editormd的实例对象
         */

        showToolbar : function(callback) {
            var settings = this.settings;

            if(settings.readOnly) {
                return this;
            }

            if (settings.toolbar && (this.toolbar.length < 1 || this.toolbar.find("." + this.classPrefix + "menu").html() === "") )
            {
                this.setToolbar();
            }

            settings.toolbar = true;

            this.toolbar.show();
            this.resize();

            $.proxy(callback || function(){}, this)();

            return this;
        },

        /**
         * 隐藏工具栏
         * Hide toolbar
         *
         * @param   {Function} [callback=function(){}] 回调函数
         * @returns {editormd}                         this(editormd instance object.)
         */

        hideToolbar : function(callback) {
            var settings = this.settings;

            settings.toolbar = false;
            this.toolbar.hide();
            this.resize();

            $.proxy(callback || function(){}, this)();

            return this;
        },

        /**
         * 页面滚动时工具栏的固定定位
         * Set toolbar in window scroll auto fixed position
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setToolbarAutoFixed : function(fixed) {

            var state    = this.state;
            var editor   = this.editor;
            var toolbar  = this.toolbar;
            var settings = this.settings;

            if (typeof fixed !== "undefined")
            {
                settings.toolbarAutoFixed = fixed;
            }

            var autoFixedHandle = function(){
                var $window = $(window);
                var top     = $window.scrollTop();

                if (!settings.toolbarAutoFixed)
                {
                    return false;
                }

                if (top - editor.offset().top > 10 && top < editor.height())
                {
                    toolbar.css({
                        position : "fixed",
                        width    : editor.width() + "px",
                        left     : ($window.width() - editor.width()) / 2 + "px"
                    });
                }
                else
                {
                    toolbar.css({
                        position : "absolute",
                        width    : "100%",
                        left     : 0
                    });
                }
            };

            if (!state.fullscreen && !state.preview && settings.toolbar && settings.toolbarAutoFixed)
            {
                $(window).bind("scroll", autoFixedHandle);
            }

            return this;
        },

        /**
         * 配置和初始化工具栏
         * Set toolbar and Initialization
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setToolbar : function() {
            var settings    = this.settings;

            if(settings.readOnly) {
                return this;
            }

            var editor      = this.editor;
            var preview     = this.preview;
            var classPrefix = this.classPrefix;

            var toolbar     = this.toolbar = editor.children("." + classPrefix + "toolbar");

            if (settings.toolbar && toolbar.length < 1)
            {
                var toolbarHTML = "<div class=\"" + classPrefix + "toolbar\"><div class=\"" + classPrefix + "toolbar-container\"><ul class=\"" + classPrefix + "menu\"></ul></div></div>";

                editor.append(toolbarHTML);
                toolbar = this.toolbar = editor.children("." + classPrefix + "toolbar");
            }

            if (!settings.toolbar)
            {
                toolbar.hide();

                return this;
            }

            toolbar.show();

            var icons       = (typeof settings.toolbarIcons === "function") ? settings.toolbarIcons()
                            : ((typeof settings.toolbarIcons === "string")  ? editormd.toolbarModes[settings.toolbarIcons] : settings.toolbarIcons);

            var toolbarMenu = toolbar.find("." + this.classPrefix + "menu"), menu = "";
            var pullRight   = false;

            for (var i = 0, len = icons.length; i < len; i++)
            {
                var name = icons[i];

                if (name === "||")
                {
                    pullRight = true;
                }
                else if (name === "|")
                {
                    menu += "<li class=\"divider\" unselectable=\"on\">|</li>";
                }
                else
                {
                    var isHeader = (/h(\d)/.test(name));
                    var index    = name;

                    if (name === "watch" && !settings.watch) {
                        index = "unwatch";
                    }

                    var title     = settings.lang.toolbar[index];
                    var iconTexts = settings.toolbarIconTexts[index];
                    var iconClass = settings.toolbarIconsClass[index];

                    title     = (typeof title     === "undefined") ? "" : title;
                    iconTexts = (typeof iconTexts === "undefined") ? "" : iconTexts;
                    iconClass = (typeof iconClass === "undefined") ? "" : iconClass;

                    var menuItem = pullRight ? "<li class=\"pull-right\">" : "<li>";

                    if (typeof settings.toolbarCustomIcons[name] !== "undefined" && typeof settings.toolbarCustomIcons[name] !== "function")
                    {
                        menuItem += settings.toolbarCustomIcons[name];
                    }
                    else
                    {
                        menuItem += "<a href=\"javascript:;\" title=\"" + title + "\" unselectable=\"on\">";
                        menuItem += "<i class=\"fa " + iconClass + "\" name=\""+name+"\" unselectable=\"on\">"+((isHeader) ? name.toUpperCase() : ( (iconClass === "") ? iconTexts : "") ) + "</i>";
                        menuItem += "</a>";
                    }

                    menuItem += "</li>";

                    menu = pullRight ? menuItem + menu : menu + menuItem;
                }
            }

            toolbarMenu.html(menu);
            var rlist = toolbarMenu.find("li.pull-right").detach();
            if (rlist)
            {
                rlist.appendTo(toolbarMenu);
            }

            toolbarMenu.find("[title=\"Lowercase\"]").attr("title", settings.lang.toolbar.lowercase);
            toolbarMenu.find("[title=\"ucwords\"]").attr("title", settings.lang.toolbar.ucwords);

            this.setToolbarHandler();
            this.setToolbarAutoFixed();

            return this;
        },

        /**
         * 工具栏图标事件处理对象序列
         * Get toolbar icons event handlers
         *
         * @param   {Object}   cm    CodeMirror的实例对象
         * @param   {String}   name  要获取的事件处理器名称
         * @returns {Object}         返回处理对象序列
         */

        dialogLockScreen : function() {
            $.proxy(editormd.dialogLockScreen, this)();

            return this;
        },

        dialogShowMask : function(dialog) {
            $.proxy(editormd.dialogShowMask, this)(dialog);

            return this;
        },

        getToolbarHandles : function(name) {
            var toolbarHandlers = this.toolbarHandlers = editormd.toolbarHandlers;

            return (name && typeof toolbarIconHandlers[name] !== "undefined") ? toolbarHandlers[name] : toolbarHandlers;
        },

        /**
         * 工具栏图标事件处理器
         * Bind toolbar icons event handle
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        setToolbarHandler : function() {
            var _this               = this;
            var settings            = this.settings;

            if (!settings.toolbar || settings.readOnly) {
                return this;
            }

            var toolbar             = this.toolbar;
            var cm                  = this.cm;
            var classPrefix         = this.classPrefix;
            var toolbarIcons        = this.toolbarIcons = toolbar.find("." + classPrefix + "menu > li > a");
            var toolbarIconHandlers = this.getToolbarHandles();

            toolbarIcons.bind(editormd.mouseOrTouch("click", "touchend"), function(event) {

                var icon                = $(this).children(".fa");
                var name                = icon.attr("name");
                var cursor              = cm.getCursor();
                var selection           = cm.getSelection();

                if (name === "") {
                    return ;
                }

                _this.activeIcon = icon;

                if (typeof toolbarIconHandlers[name] !== "undefined")
                {
                    $.proxy(toolbarIconHandlers[name], _this)(cm);
                }
                else
                {
                    if (typeof settings.toolbarHandlers[name] !== "undefined")
                    {
                        $.proxy(settings.toolbarHandlers[name], _this)(cm, icon, cursor, selection);
                    }
                }

                if (name !== "link" && name !== "reference-link" && name !== "image" && name !== "code-block" &&
                    name !== "preformatted-text" && name !== "watch" && name !== "preview" && name !== "search" && name !== "fullscreen" && name !== "info")
                {
                    cm.focus();
                }

                return false;

            });

            return this;
        },

        /**
         * 动态创建对话框
         * Creating custom dialogs
         *
         * @param   {Object} options  配置项键值对 Key/Value
         * @returns {dialog}          返回创建的dialog的jQuery实例对象
         */

        createDialog : function(options) {
            return $.proxy(editormd.createDialog, this)(options);
        },

        /**
         * 创建关于Editor.md的对话框
         * Create about Editor.md dialog
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        createInfoDialog : function() {
            var _this        = this;
			var editor       = this.editor;
            var classPrefix  = this.classPrefix;

            var infoDialogHTML = [
                "<div class=\"" + classPrefix + "dialog " + classPrefix + "dialog-info\" style=\"\">",
                "<div class=\"" + classPrefix + "dialog-container\">",
                "<h1><i class=\"editormd-logo editormd-logo-lg editormd-logo-color\"></i> " + editormd.title + "<small>v" + editormd.version + "</small></h1>",
                "<p>" + this.lang.description + "</p>",
                "<p style=\"margin: 10px 0 20px 0;\"><a href=\"" + editormd.homePage + "\" target=\"_blank\">" + editormd.homePage + " <i class=\"fa fa-external-link\"></i></a></p>",
                "<p style=\"font-size: 0.85em;\">Copyright &copy; 2020 <a href=\"https://github.com/pandao\" target=\"_blank\" class=\"hover-link\">Pandao</a>, The <a href=\"https://github.com/pandao/editor.md/blob/master/LICENSE\" target=\"_blank\" class=\"hover-link\">MIT</a> License.</p>",
                "</div>",
                "<a href=\"javascript:;\" class=\"fa fa-close " + classPrefix + "dialog-close\"></a>",
                "</div>"
            ].join("\n");

            editor.append(infoDialogHTML);

            var infoDialog  = this.infoDialog = editor.children("." + classPrefix + "dialog-info");

            infoDialog.find("." + classPrefix + "dialog-close").bind(editormd.mouseOrTouch("click", "touchend"), function() {
                _this.hideInfoDialog();
            });

            infoDialog.css("border", (editormd.isIE8) ? "1px solid #ddd" : "").css("z-index", editormd.dialogZindex).show();

            this.infoDialogPosition();

            return this;
        },

        /**
         * 关于Editor.md对话居中定位
         * Editor.md dialog position handle
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        infoDialogPosition : function() {
            var infoDialog = this.infoDialog;

			var _infoDialogPosition = function() {
				infoDialog.css({
					top  : ($(window).height() - infoDialog.height()) / 2 + "px",
					left : ($(window).width()  - infoDialog.width()) / 2  + "px"
				});
			};

			_infoDialogPosition();

			$(window).resize(_infoDialogPosition);

            return this;
        },

        /**
         * 显示关于Editor.md
         * Display about Editor.md dialog
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        showInfoDialog : function() {

            $("html,body").css("overflow-x", "hidden");

            var _this       = this;
			var editor      = this.editor;
            var settings    = this.settings;
			var infoDialog  = this.infoDialog = editor.children("." + this.classPrefix + "dialog-info");

            if (infoDialog.length < 1)
            {
                this.createInfoDialog();
            }

            this.lockScreen(true);

            this.mask.css({
						opacity         : settings.dialogMaskOpacity,
						backgroundColor : settings.dialogMaskBgColor
					}).show();

			infoDialog.css("z-index", editormd.dialogZindex).show();

			this.infoDialogPosition();

            return this;
        },

        /**
         * 隐藏关于Editor.md
         * Hide about Editor.md dialog
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        hideInfoDialog : function() {
            $("html,body").css("overflow-x", "");
            this.infoDialog.hide();
            this.mask.hide();
            this.lockScreen(false);

            return this;
        },

        /**
         * 锁屏
         * lock screen
         *
         * @param   {Boolean}    lock    Boolean 布尔值，是否锁屏
         * @returns {editormd}           返回editormd的实例对象
         */

        lockScreen : function(lock) {
            editormd.lockScreen(lock);
            this.resize();

            return this;
        },

        /**
         * 编辑器界面重建，用于动态语言包或模块加载等
         * Recreate editor
         *
         * @returns {editormd}  返回editormd的实例对象
         */

        recreate : function() {
            var _this            = this;
            var editor           = this.editor;
            var settings         = this.settings;

            this.codeMirror.remove();

            this.setCodeMirror();

            if (!settings.readOnly)
            {
                if (editor.find(".editormd-dialog").length > 0) {
                    editor.find(".editormd-dialog").remove();
                }

                if (settings.toolbar)
                {
                    this.getToolbarHandles();
                    this.setToolbar();
                }
            }

            this.loadedDisplay(true);

            return this;
        },

        /**
         * 高亮预览HTML的pre代码部分
         * highlight of preview codes
         *
         * @returns {editormd}             返回editormd的实例对象
         */

        previewCodeHighlight : function() {
            var settings         = this.settings;
            var previewContainer = this.previewContainer;

            if (settings.previewCodeHighlight)
            {
                previewContainer.find("pre").addClass("snippet prettyprint linenums");
                if (typeof prettyPrint !== "undefined") 
                {
                    prettyPrint();
                    if (typeof window.Clipboard !== "undefined")
                    {
                        window.Clipboard.render(settings.path); 
                    }
                }
            }

            return this;
        },

        /**
         * 解析TeX(KaTeX)科学公式
         * TeX(KaTeX) Renderer
         *
         * @returns {editormd}             返回editormd的实例对象
         */

        // katexRender : function() {

        //     if (timer === null)
        //     {
        //         return this;
        //     }

        //     this.previewContainer.find("." + editormd.classNames.tex).each(function(){
        //         var tex  = $(this);
        //         editormd.$katex.render(tex.text(), tex[0]);

        //         tex.find(".katex").css("font-size", "1.6em");
        //     });

        //     return this;
        // },

        mathjaxRender : function() {
            if (timer === null) {
                return this;
            }
            if (MathJax.typeset) MathJax.typeset();
            return this;
        },

        /**
         * 解析和渲染流程图及时序图
         * FlowChart and SequenceDiagram Renderer
         *
         * @returns {editormd}             返回editormd的实例对象
         */

        flowChartAndSequenceDiagramRender : function() {
            var $this            = this;
            var settings         = this.settings;
            var previewContainer = this.previewContainer;

            if (editormd.isIE8) {
                return this;
            }

            if (settings.flowChart) {
                if (flowchartTimer === null) {
                    return this;
                }
                previewContainer.find(".flowchart").flowChart();
            }

            if (settings.sequenceDiagram) {
                previewContainer.find(".sequence-diagram").sequenceDiagram({theme: "simple"});
            }

            $this.syncPreviewScrolling();

            return this;
        },

        /**
         * 注册键盘快捷键处理
         * Register CodeMirror keyMaps (keyboard shortcuts).
         *
         * @param   {Object}    keyMap      KeyMap key/value {"(Ctrl/Shift/Alt)-Key" : function(){}}
         * @returns {editormd}              return this
         */

        registerKeyMaps : function(keyMap) {

            var _this           = this;
            var cm              = this.cm;
            var settings        = this.settings;
            var toolbarHandlers = editormd.toolbarHandlers;
            var disabledKeyMaps = settings.disabledKeyMaps;

            keyMap              = keyMap || null;

            if (keyMap)
            {
                for (var i in keyMap)
                {
                    if ($.inArray(i, disabledKeyMaps) < 0)
                    {
                        var map = {};
                        map[i]  = keyMap[i];

                        cm.addKeyMap(keyMap);
                    }
                }
            }
            else
            {
                cacheKeymaps = [];
                for (var k in editormd.keyMaps)
                {
                    var _keyMap = editormd.keyMaps[k];
                    var handle = (typeof _keyMap === "string") ? $.proxy(toolbarHandlers[_keyMap], _this) : $.proxy(_keyMap, _this);

                    if ($.inArray(k, ["F9", "F10", "F11"]) < 0 && $.inArray(k, disabledKeyMaps) < 0)
                    {
                        var _map = {};
                        _map[k] = handle;

                        cm.addKeyMap(_map);

                        cacheKeymaps.push(_map);
                    }
                }

                $(window).keydown(function(event) {

                    var keymaps = {
                        "120" : "F9",
                        "121" : "F10",
                        "122" : "F11"
                    };

                    if ( $.inArray(keymaps[event.keyCode], disabledKeyMaps) < 0 )
                    {
                        switch (event.keyCode)
                        {
                            case 120:
                                    $.proxy(toolbarHandlers["watch"], _this)();
                                    return false;
                                break;

                            case 121:
                                    $.proxy(toolbarHandlers["preview"], _this)();
                                    return false;
                                break;

                            case 122:
                                    $.proxy(toolbarHandlers["fullscreen"], _this)();
                                    return false;
                                break;

                            default:
                                break;
                        }
                    }
                });
            }

            return this;
        },

        /**
         * 取消注册键盘快捷键处理
         * UnRegister CodeMirror keyMaps (keyboard shortcuts).
         *
         * @returns {editormd}              return this
         */
        unregisterKeyMaps : function() {

            var _this           = this;
            var cm              = this.cm;

            if (cacheKeymaps)
            {
                for (var i in cacheKeymaps)
                {
                    cm.removeKeyMap(cacheKeymaps[i]);
                }
            }
            cacheKeymaps = null;

            return this;
        },

        /**
         * 同步预览进行滚动
         *
         * @returns {editormd} return this
         */
        syncPreviewScrolling : function () {
            var _this            = this;
            var cm               = this.cm;
            var preview          = this.preview;

            var scrollInfo = cm.getScrollInfo();
            var cmPos = cm.coordsChar(scrollInfo, "local");
            var line_markers = preview.find('* [data-source-line]');
            var lines = [];
            line_markers.each(function() {
                lines.push($(this).data('source-line'));
            });

            var currentLine = cmPos.line;
            var lastMarker = false;
            var nextMarker = false;
            for (var i = 0; i < lines.length; i++) {
                if (lines[i] < currentLine)
                {
                    lastMarker = i;
                }
                else
                {
                    nextMarker = i;
                    break;
                }
            }

            var lastLine = 0;
            if (lastMarker !== false)
            {
                lastLine = lines[lastMarker];
            }
            var nextLine = cm.lastLine();
            if (nextMarker !== false)
            {
                nextLine = lines[nextMarker];
            }
            var percentage = 0;
            if (lastLine != nextLine)
            {
                percentage = (currentLine - lastLine) / (nextLine - lastLine);
            }

            var lastPosition = 0;
            if (lastMarker !== false)
            {
                lastPosition = preview.find('[data-source-line="' + lastLine + '"]').get(0).offsetTop;
            }
            var nextPosition = preview.get(0).scrollHeight;
            if (nextMarker !== false)
            {
                nextPosition = preview.find('[data-source-line="' + nextLine + '"]').get(0).offsetTop;
            }
            var scrollTop = lastPosition + (nextPosition - lastPosition) * percentage;
            preview.scrollTop(scrollTop);

            return this;
        },

        /**
         * 绑定同步滚动
         *
         * @returns {editormd} return this
         */

        bindScrollEvent : function() {

            var _this            = this;
            var cm               = this.cm;
            var preview          = this.preview;
            var settings         = this.settings;
            var codeMirror       = this.codeMirror;
            var mouseOrTouch     = editormd.mouseOrTouch;

            if (!settings.syncScrolling) {
                return this;
            }

            var cmBindScroll = function() {
                codeMirror.find(".CodeMirror-scroll").bind(mouseOrTouch("scroll", "touchmove"), function(event) {
                    _this.syncPreviewScrolling();

                    $.proxy(settings.onscroll, _this)(event);
                });
            };

            var cmUnbindScroll = function() {
                codeMirror.find(".CodeMirror-scroll").unbind(mouseOrTouch("scroll", "touchmove"));
            };

            var previewBindScroll = function() {

                preview.bind(mouseOrTouch("scroll", "touchmove"), function(event) {
                    if (_this.state.preview)
                    {
                        $.proxy(settings.onpreviewscroll, _this)(event);
                        return;
                    }

                    var height    = $(this).height();
                    var scroll = preview.scrollTop();
                    var lastMarker = false;
                    var nextMarker = false;
                    var line_markers = preview.find('* [data-source-line]');
                    for(var i = 0; i < line_markers.length; i++)
                    {
                        if(line_markers[i].offsetTop < scroll)
                        {
                            lastMarker = i;
                        }
                        else
                        {
                            nextMarker = i;
                            break;
                        }
                    }

                    var lastLine = 0;
                    if (lastMarker !== false)
                    {
                        lastLine = line_markers[lastMarker].offsetTop;
                    }
                    var nextLine = height;
                    if (nextMarker !== false)
                    {
                        nextLine = line_markers[nextMarker].offsetTop;
                    }
                    var percentage = 0;
                    if (lastLine != nextLine)
                    {
                        percentage = (scroll - lastLine) / (nextLine - lastLine);
                    }
                    if (lastMarker !== false)
                    {
                        lastLine = line_markers[lastMarker].attributes["data-source-line"].value;
                    }
                    if (nextMarker !== false)
                    {
                        nextLine = line_markers[nextMarker].attributes["data-source-line"].value;
                    }

                    var lastCoords = cm.charCoords({line : lastLine, ch : 0}, "local");
                    var nextCoords = cm.charCoords({line : nextLine, ch : 0}, "local");
                    var scrollTop = (nextCoords.top - lastCoords.top) * percentage + lastCoords.top;
                    cm.scrollTo(null, scrollTop);

                    $.proxy(settings.onpreviewscroll, _this)(event);
                });

            };

            var previewUnbindScroll = function() {
                preview.unbind(mouseOrTouch("scroll", "touchmove"));
            };

			codeMirror.bind({
				mouseover  : cmBindScroll,
				mouseout   : cmUnbindScroll,
				touchstart : cmBindScroll,
				touchend   : cmUnbindScroll
			});

            if (settings.syncScrolling === "single") {
                return this;
            }

			preview.bind({
				mouseover  : previewBindScroll,
				mouseout   : previewUnbindScroll,
				touchstart : previewBindScroll,
				touchend   : previewUnbindScroll
			});

            return this;
        },

        bindTocScrollEvent : function(tocContainer) {

            var _this       = this;
            var cm          = this.cm;
            var preview     = this.preview;
            var settings         = this.settings;
            var previewContainer = this.previewContainer;

            if (!settings.syncScrolling) {
                return this;
            }

            tocContainer.find('a').on('click', function () {
                var $el = $(this);
                var id = $el.attr('href');
                var lev = $el.attr('level');
                var line = $el.attr('lineIdx');

                preview.scrollTop(0);
                var topOrg = preview.offset().top;

                var hdName = id.substring(1);
                var refs = previewContainer.find('a[name="' + hdName + '"]');
                var ref = refs;
                if (line && refs.length > 1) {
                    // 解决相同标题时跳转错误
                    refs.each(function () {
                        if ($(this).parent().attr('data-source-line') == line) {
                            ref = $(this);
                            return false;
                        }
                    })
                }
                var topPos = ref.offset().top - topOrg;
                preview.scrollTop(topPos);

                var currentLine = ref.parent().attr('data-source-line');
                var coords = cm.charCoords({line : currentLine, ch : 0}, "local");
                cm.scrollTo(null, coords.top);

                return false;
            });

            return this;
        },

        bindChangeEvent : function() {

            var _this            = this;
            var cm               = this.cm;
            var settings         = this.settings;

            if (!settings.syncScrolling) {
                return this;
            }

            cm.on("change", function(_cm, changeObj) {

                if (settings.watch)
                {
                    _this.previewContainer.css("padding", settings.autoHeight ? "20px 20px 50px 40px" : "20px");
                }

                if (timer) {
                    clearTimeout(timer);
                    timer = undefined;
                }

                var delay = elapsedSaveTime; 
                if (delay > settings.delay) {
                    delay = settings.delay;
                }

                if (delay < 10) {
                    delay = 10;
                }
                
                timer = setTimeout(function() {
                    timer = undefined;

                    var prevTime = new Date().getTime();
                    _this.save();
                    var currTime = new Date().getTime();
                    elapsedSaveTime = (currTime - prevTime) * 4;
                }, delay);
            });

            return this;
        },

        bindVimModeChangeEvent : function() {

            var _this            = this;
            var cm               = this.cm;
            var state            = this.state;
            var settings         = this.settings;

            cm.on("vim-mode-change", function(changeObj) {
                // 禁用掉快捷键加粗斜体等
                if (changeObj.mode === "insert") {
                    if (!cacheKeymaps) {
                        _this.registerKeyMaps();
                    }
                }
                else {
                    _this.unregisterKeyMaps();
                }
            });

            if (settings.keymapMode !== "default") {
                _this.cm.setOption("keyMap", settings.keymapMode);
            }

            return this;
        },

        /**
         * 加载队列完成之后的显示处理
         * Display handle of the module queues loaded after.
         *
         * @param   {Boolean}   recreate   是否为重建编辑器
         * @returns {editormd}             返回editormd的实例对象
         */

        loadedDisplay : function(recreate) {

            recreate             = recreate || false;

            var _this            = this;
            var editor           = this.editor;
            var preview          = this.preview;
            var settings         = this.settings;

            this.containerMask.hide();

            this.save();

            if (settings.watch) {
                preview.show();
            }

            editor.data("oldWidth", editor.width()).data("oldHeight", editor.height()); // 为了兼容Zepto

            this.resize();
            //暂时弃用键盘快捷键
            // this.registerKeyMaps();

            $(window).resize(function(){
                _this.resize();
            });

            this.bindScrollEvent().bindChangeEvent().bindVimModeChangeEvent();

            if (!recreate)
            {
                $.proxy(settings.onload, this)();
            }

            this.state.loaded = true;

            return this;
        },

        /**
         * 设置编辑器的宽度
         * Set editor width
         *
         * @param   {Number|String} width  编辑器宽度值
         * @returns {editormd}             返回editormd的实例对象
         */

        width : function(width) {

            this.editor.css("width", (typeof width === "number") ? width  + "px" : width);
            this.resize();

            return this;
        },

        /**
         * 设置编辑器的高度
         * Set editor height
         *
         * @param   {Number|String} height  编辑器高度值
         * @returns {editormd}              返回editormd的实例对象
         */

        height : function(height) {

            this.editor.css("height", (typeof height === "number")  ? height  + "px" : height);
            this.resize();

            return this;
        },

        /**
         * 调整编辑器的尺寸和布局
         * Resize editor layout
         *
         * @param   {Number|String} [width=null]  编辑器宽度值
         * @param   {Number|String} [height=null] 编辑器高度值
         * @returns {editormd}                    返回editormd的实例对象
         */

        resize : function(width, height) {

            width  = width  || null;
            height = height || null;

            var state      = this.state;
            var editor     = this.editor;
            var preview    = this.preview;
            var toolbar    = this.toolbar;
            var settings   = this.settings;
            var codeMirror = this.codeMirror;

            if (width)
            {
                editor.css("width", (typeof width  === "number") ? width  + "px" : width);
            }

            if (settings.autoHeight && !state.fullscreen && !state.preview)
            {
                editor.css("height", "auto");
                codeMirror.css("height", "auto");
            }
            else
            {
                if (height)
                {
                    editor.css("height", (typeof height === "number") ? height + "px" : height);
                }

                if (state.fullscreen)
                {
                    editor.height($(window).height() - 10);
                }

                if (settings.toolbar && !settings.readOnly)
                {
                    codeMirror.css("margin-top", toolbar.height() + 1).height(editor.height() - toolbar.height());
                }
                else
                {
                    codeMirror.css("margin-top", 0).height(editor.height());
                }
            }

            if(settings.watch)
            {
                codeMirror.width(editor.width() / 2);
                preview.width((!state.preview) ? editor.width() / 2 : editor.width());

                this.previewContainer.css("padding", settings.autoHeight ? "20px 20px 50px 40px" : "20px");

                if (settings.toolbar && !settings.readOnly)
                {
                    preview.css("top", toolbar.height() + 1);
                }
                else
                {
                    preview.css("top", 0);
                }

                if (settings.autoHeight && !state.fullscreen && !state.preview)
                {
                    preview.height("");
                }
                else
                {
                    var previewHeight = (settings.toolbar && !settings.readOnly) ? editor.height() - toolbar.height() : editor.height();

                    preview.height(previewHeight);
                }
            }
            else
            {
                codeMirror.width(editor.width());
                preview.hide();
            }

            if (state.loaded)
            {
                $.proxy(settings.onresize, this)();
            }

            return this;
        },

        rtrim : function(str) {
            var sufLen = 0;
            var l = str.length;
            if (l == 0) return "";
            for (var i = l - 1; i >= 0; --i) {
                if (str[i] == ' ') {
                    ++sufLen;
                } else {
                    break;
                }
            }
            return str.substr(0, l - sufLen);
        },

        invMathProcess: function(md) {
            var mds = md.split("\n");
            var preMath = false;
            var res = "";
            for (var i = 0; i < mds.length; ++i) {
                var now = mds[i];
                if (now == '```math') {
                    preMath = true;
                } else if (now == '```') {
                    if (preMath == true) {
                        preMath = false; 
                    } else {
                        res += now + "\n";
                    }
                } else {
                    res += now + "\n";
                }
            }
            return res;
        },

        /**
         * 处理mathjax
         * 
         *
         * @param   {String}                    待处理markdown源码
         * @returns {String}                    返回处理后的Markdown源码
         */

        mathProcess: function(md) {
            var rtrim = str => {
                var sufLen = 0;
                var l = str.length;
                if (l == 0) return "";
                for (var i = l - 1; i >= 0; --i) {
                    if (str[i] == ' ') {
                        ++sufLen;
                    } else {
                        break;
                    }
                }
                return str.substr(0, l - sufLen);
            };
            var getPre = s => {
                var res = "";
                for (var i = 0; i < s.length; ++i) {
                    if ([" ", ">", '\t'].indexOf(s[i]) !== -1) {
                        res += s[i];
                    } else {
                        break;
                    }
                }
                return res;
            };
            var addPre = (mds, pre) => {
                return mds.map(x => pre + x);
            };
            var workMath = mds => {
                var res = [];
                var BlockContent = [];
                var preBlock = false;
                var preCode = false;
                for (var i = 0; i < mds.length; ++i) {
                    var now = rtrim(mds[i]);
                    var nowPre = getPre(now);
                    now = now.substr(nowPre.length, now.length - nowPre.length);
                    if (now == "$$") {
                        if (preCode == true) {
                            res.push(now);
                            continue;
                        }
                        BlockContent.push([nowPre, now].join(""));
                        if (preBlock == false) {
                            preBlock = true;
                        } else {
                            res.push([nowPre, "```math"].join(""));
                            res = res.concat(BlockContent);
                            res.push([nowPre, "```"].join(""));
                            BlockContent = [];
                            preBlock = false;
                        }
                    } else if (/^```.*$/.test(now)) {
                        res.push([nowPre, now].join(""));
                        preCode = !preCode;
                    } else {
                        if (preBlock == false) {
                            if (preCode || 
                                (now.length > 0 && now[0] == '#')) {
                                res.push([nowPre, now].join(""));
                                continue;
                            }
                            var _now = "";
                            var preInline = false;
                            var InlineContent = "";
                            for (var j = 0; j < now.length; ++j) {
                                var ch = now[j];
                                if (ch == '$') {
                                    InlineContent += ch;
                                    if (preInline == true) {
                                        _now += "`" + InlineContent + "`";
                                        InlineContent = "";
                                        preInline = false;
                                    } else {
                                        preInline = true;
                                    }
                                } else {
                                    if (preInline == true) {
                                        InlineContent += ch;
                                    } else {
                                        _now += ch;
                                    }
                                }
                            }
                            _now += InlineContent;
                            res.push([nowPre, _now].join(""));
                        } else {
                            BlockContent.push([nowPre, now].join(""));
                        }
                    }
                }
                return res.concat(BlockContent);
            };
            return workMath(md.split("\n")).join("\n");
        },

        /**
         * 解析和保存Markdown代码
         * Parse & Saving Markdown source code
         *
         * @returns {editormd}     返回editormd的实例对象
         */

        save : function() {

            var _this            = this;
            var state            = this.state;
            var settings         = this.settings;

            if (timer === null && !(!settings.watch && state.preview))
            {
                return this;
            }

            var cm               = this.cm;
            var cmValue          = cm.getValue();
            var previewContainer = this.previewContainer;

            if (settings.mode !== "gfm" && settings.mode !== "markdown")
            {
                this.markdownTextarea.val(cmValue);

                return this;
            }

            var marked          = editormd.$marked;

            var markdownToC     = this.markdownToC = [];
            var rendererOptions = this.markedRendererOptions = {
                path                 : settings.path,
                toc                  : settings.toc,
                tocm                 : settings.tocm,
                tocStartLevel        : settings.tocStartLevel,
                pageBreak            : settings.pageBreak,
                taskList             : settings.taskList,
                emoji                : settings.emoji,
                tex                  : settings.tex,
                atLink               : settings.atLink,           // for @link
                emailLink            : settings.emailLink,        // for mail address auto link
                flowChart            : settings.flowChart,
                sequenceDiagram      : settings.sequenceDiagram,
                previewCodeHighlight : settings.previewCodeHighlight,
            };

            var markedOptions = this.markedOptions = {
                renderer    : editormd.markedRenderer(markdownToC, rendererOptions),
                gfm         : true,
                tables      : true,
                breaks      : true,
                pedantic    : false,
                sanitize    : (settings.htmlDecode) ? false : true,  // 关闭忽略HTML标签，即开启识别HTML标签，默认为false
                smartLists  : true,
                smartypants : false,
                imageLazyLoad: settings.imageLazyLoad,
                imageLazyLoadLoadingICON: settings.imageLazyLoadLoadingICON,
                
                // mathDelimiters : [['$', '$'], ['\\(', '\\)'], ['\\[', '\\]'], ['$$', '$$'], 'beginend']
            };

            marked.setOptions(markedOptions);

            // console.log(cmValue);
            // console.log(this.mathProcess(cmValue));
            var newMarkdownDoc = "";
            newMarkdownDoc = editormd.$marked(this.mathProcess(cmValue), markedOptions);

            //console.info("cmValue", cmValue, newMarkdownDoc);

            newMarkdownDoc = editormd.filterHTMLTags(newMarkdownDoc, settings.htmlDecode); 

            //console.error("cmValue", cmValue, newMarkdownDoc);

            this.markdownTextarea.text(cmValue);

            cm.save(); 

            if (settings.saveHTMLToTextarea)
            {
                this.htmlTextarea.text(newMarkdownDoc);
            }

            if(settings.watch || (!settings.watch && state.preview))
            {
                previewContainer.html(newMarkdownDoc);

                this.previewCodeHighlight();

                if (settings.toc)
                {
                    var tocContainer = (settings.tocContainer === "") ? previewContainer : $(settings.tocContainer);
                    var tocMenu      = tocContainer.find("." + this.classPrefix + "toc-menu");

                    tocContainer.attr("previewContainer", (settings.tocContainer === "") ? "true" : "false");

                    if (settings.tocContainer !== "" && tocMenu.length > 0)
                    {
                        tocMenu.remove();
                    }

                    var tocContainerInternal = editormd.markdownToCRenderer(markdownToC, tocContainer, settings.tocDropdown, settings.tocStartLevel);
                    this.bindTocScrollEvent(tocContainerInternal);

                    if (settings.tocDropdown || tocContainer.find("." + this.classPrefix + "toc-menu").length > 0)
                    {
                        editormd.tocDropdownMenu(tocContainer, (settings.tocTitle !== "") ? settings.tocTitle : this.lang.tocTitle);
                    }

                    if (settings.tocContainer !== "")
                    {
                        previewContainer.find(".markdown-toc").css("border", "none");
                    }
                }

                if (settings.flowChart || settings.sequenceDiagram)
                {
                    // flowchartTimer = setTimeout(function(){
                    //     clearTimeout(flowchartTimer);
                    //     _this.flowChartAndSequenceDiagramRender();
                    //     flowchartTimer = null;
                    // }, 10);

                    this.flowChartAndSequenceDiagramRender();
                }

                if (settings.tex)
                {
                    // if (!editormd.kaTeXLoaded && settings.autoLoadModules)
                    // {
                    //     editormd.loadKaTeX(settings.path, function() {
                    //         editormd.$katex = katex;
                    //         editormd.kaTeXLoaded = true;
                    //         _this.katexRender();
                    //     });
                    // }
                    // else
                    // {
                    //     editormd.$katex = katex;
                    //     this.katexRender();
                    // }
                    this.mathjaxRender();
                }
                
                if (settings.imageLazyLoad) {
                    window.ScriptAction.imageLazyLoad();
                }

                if (state.loaded)
                {
                    $.proxy(settings.onchange, this)();
                }
            }

            return this;
        },

        /**
         * 聚焦光标位置
         * Focusing the cursor position
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        focus : function() {
            this.cm.focus();
            return this;
        },

        /**
         * 设置光标的位置
         * Set cursor position
         *
         * @param   {Object}    cursor 要设置的光标位置键值对象，例：{line:1, ch:0}
         * @returns {editormd}         返回editormd的实例对象
         */

        setCursor : function(cursor) {
            this.cm.setCursor(cursor);
            return this;
        },

        /**
         * 获取当前光标的位置
         * Get the current position of the cursor
         *
         * @returns {Cursor}         返回一个光标Cursor对象
         */

        getCursor : function() {
            return this.cm.getCursor();
        },

        /**
         * 设置光标选中的范围
         * Set cursor selected ranges
         *
         * @param   {Object}    from   开始位置的光标键值对象，例：{line:1, ch:0}
         * @param   {Object}    to     结束位置的光标键值对象，例：{line:1, ch:0}
         * @returns {editormd}         返回editormd的实例对象
         */

        setSelection : function(from, to) {

            this.cm.setSelection(from, to);

            return this;
        },

        /**
         * 获取光标选中的文本
         * Get the texts from cursor selected
         *
         * @returns {String}         返回选中文本的字符串形式
         */

        getSelection : function() {
            return this.cm.getSelection();
        },

        /**
         * 设置光标选中的文本范围
         * Set the cursor selection ranges
         *
         * @param   {Array}    ranges  cursor selection ranges array
         * @returns {Array}            return this
         */

        setSelections : function(ranges) {
            this.cm.setSelections(ranges);

            return this;
        },

        /**
         * 获取光标选中的文本范围
         * Get the cursor selection ranges
         *
         * @returns {Array}         return selection ranges array
         */

        getSelections : function() {
            return this.cm.getSelections();
        },

        /**
         * 替换当前光标选中的文本或在当前光标处插入新字符
         * Replace the text at the current cursor selected or insert a new character at the current cursor position
         *
         * @param   {String}    value  要插入的字符值
         * @returns {editormd}         返回editormd的实例对象
         */

        replaceSelection : function(value) {
            this.cm.replaceSelection(value);

            return this;
        },

        /**
         * 在当前光标处插入新字符
         * Insert a new character at the current cursor position
         *
         * 同replaceSelection()方法
         * With the replaceSelection() method
         *
         * @param   {String}    value  要插入的字符值
         * @returns {editormd}         返回editormd的实例对象
         */

        insertValue : function(value) {
            this.replaceSelection(value);

            return this;
        },

        /**
         * 追加markdown
         * append Markdown to editor
         *
         * @param   {String}    md     要追加的markdown源文档
         * @returns {editormd}         返回editormd的实例对象
         */

        appendMarkdown : function(md) {
            var settings = this.settings;
            var cm       = this.cm;

            cm.setValue(cm.getValue() + md);

            return this;
        },

        /**
         * 设置和传入编辑器的markdown源文档
         * Set Markdown source document
         *
         * @param   {String}    md     要传入的markdown源文档
         * @returns {editormd}         返回editormd的实例对象
         */

        setMarkdown : function(md) {
            this.cm.setValue(md || this.settings.markdown);

            return this;
        },

        /**
         * 获取编辑器的markdown源文档
         * Set Editor.md markdown/CodeMirror value
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        getMarkdown : function() {
            return this.cm.getValue();
        },

        /**
         * 获取编辑器的源文档
         * Get CodeMirror value
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        getValue : function() {
            return this.cm.getValue();
        },

        /**
         * 设置编辑器的源文档
         * Set CodeMirror value
         *
         * @param   {String}     value   set code/value/string/text
         * @returns {editormd}           返回editormd的实例对象
         */

        setValue : function(value) {
            this.cm.setValue(value);

            return this;
        },

        /**
         * 清空编辑器
         * Empty CodeMirror editor container
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        clear : function() {
            this.cm.setValue("");

            return this;
        },

        /**
         * 获取解析后存放在Textarea的HTML源码
         * Get parsed html code from Textarea
         *
         * @returns {String}               返回HTML源码
         */

        getHTML : function() {
            if (!this.settings.saveHTMLToTextarea)
            {
                alert("Error: settings.saveHTMLToTextarea == false");

                return false;
            }

            return this.htmlTextarea.val();
        },

        /**
         * getHTML()的别名
         * getHTML (alias)
         *
         * @returns {String}           Return html code 返回HTML源码
         */

        getTextareaSavedHTML : function() {
            return this.getHTML();
        },

        /**
         * 获取预览窗口的HTML源码
         * Get html from preview container
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        getPreviewedHTML : function() {
            
            if (!this.settings.watch) {
                this.settings.watch = true;
                this.save();
                this.settings.watch = false;
            } else {
                this.save();
            }

            // if (!this.settings.watch)
            // {
            //     alert("Error: settings.watch == false");

            //     return false;
            // }
            
            var _this = this; 
            if (this.settings.imageLazyLoad === true) {
                let images = document.querySelectorAll(".lazyload");
                Array.prototype.forEach.call(images, function (image) {
                    if ("img" === image.tagName.toLowerCase()) {
                        image.src = "data:image/gif;base64," + _this.settings.imageLazyLoadLoadingICON;
                    }
                });
            }
            var reg = new RegExp(window.location.origin, "g");
            return $('#MJX-CHTML-styles').prop("outerHTML").replace(reg, this.settings.texTargetUrl) + "\n" + this.previewContainer.html().replace(/(MJXZERO, )+/g, "MJXZERO, ");
        },

        /**
         * 开启实时预览
         * Enable real-time watching
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        watch : function(callback) {
            var settings        = this.settings;

            if ($.inArray(settings.mode, ["gfm", "markdown"]) < 0)
            {
                return this;
            }

            this.state.watching = settings.watch = true;
            this.preview.show();

            if (this.toolbar)
            {
                var watchIcon   = settings.toolbarIconsClass.watch;
                var unWatchIcon = settings.toolbarIconsClass.unwatch;

                var icon        = this.toolbar.find(".fa[name=watch]");
                icon.parent().attr("title", settings.lang.toolbar.watch);
                icon.removeClass(unWatchIcon).addClass(watchIcon);
            }

            this.codeMirror.css("border-right", "1px solid #ddd").width(this.editor.width() / 2);

            timer = 0;

            this.save().resize();

            if (!settings.onwatch)
            {
                settings.onwatch = callback || function() {};
            }

            $.proxy(settings.onwatch, this)();

            return this;
        },

        /**
         * 关闭实时预览
         * Disable real-time watching
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        unwatch : function(callback) {
            var settings        = this.settings;
            this.state.watching = settings.watch = false;
            this.preview.hide();

            if (this.toolbar)
            {
                var watchIcon   = settings.toolbarIconsClass.watch;
                var unWatchIcon = settings.toolbarIconsClass.unwatch;

                var icon    = this.toolbar.find(".fa[name=watch]");
                icon.parent().attr("title", settings.lang.toolbar.unwatch);
                icon.removeClass(watchIcon).addClass(unWatchIcon);
            }

            this.codeMirror.css("border-right", "none").width(this.editor.width());

            this.resize();

            if (!settings.onunwatch)
            {
                settings.onunwatch = callback || function() {};
            }

            $.proxy(settings.onunwatch, this)();

            return this;
        },

        /**
         * 显示编辑器
         * Show editor
         *
         * @param   {Function} [callback=function()] 回调函数
         * @returns {editormd}                       返回editormd的实例对象
         */

        show : function(callback) {
            callback  = callback || function() {};

            var _this = this;
            this.editor.show(0, function() {
                $.proxy(callback, _this)();
            });

            return this;
        },

        /**
         * 隐藏编辑器
         * Hide editor
         *
         * @param   {Function} [callback=function()] 回调函数
         * @returns {editormd}                       返回editormd的实例对象
         */

        hide : function(callback) {
            callback  = callback || function() {};

            var _this = this;
            this.editor.hide(0, function() {
                $.proxy(callback, _this)();
            });

            return this;
        },

        /**
         * 隐藏编辑器部分，只预览HTML
         * Enter preview html state
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        previewing : function() {

            var _this            = this;
            var editor           = this.editor;
            var preview          = this.preview;
            var toolbar          = this.toolbar;
            var settings         = this.settings;
            var codeMirror       = this.codeMirror;
            var previewContainer = this.previewContainer;

            if ($.inArray(settings.mode, ["gfm", "markdown"]) < 0) {
                return this;
            }

            if (settings.toolbar && toolbar) {
                toolbar.toggle();
                toolbar.find(".fa[name=preview]").toggleClass("active");
            }

            codeMirror.toggle();

            var escHandle = function(event) {
                if (event.shiftKey && event.keyCode === 27) {
                    _this.previewed();
                }
            };

            if (codeMirror.css("display") === "none") // 为了兼容Zepto，而不使用codeMirror.is(":hidden")
            {
                this.state.preview = true;

                if (this.state.fullscreen) {
                    preview.css("background", "#fff");
                }

                editor.find("." + this.classPrefix + "preview-close-btn").show().bind(editormd.mouseOrTouch("click", "touchend"), function(){
                    _this.previewed();
                });

                if (!settings.watch)
                {
                    this.save();
                }
                else
                {
                    previewContainer.css("padding", "");
                }

                previewContainer.addClass(this.classPrefix + "preview-active");

                preview.show().css({
                    position  : "",
                    top       : 0,
                    width     : editor.width(),
                    height    : (settings.autoHeight && !this.state.fullscreen) ? "auto" : editor.height()
                });

                if (this.state.loaded)
                {
                    $.proxy(settings.onpreviewing, this)();
                }

                $(window).bind("keyup", escHandle);
            }
            else
            {
                $(window).unbind("keyup", escHandle);
                this.previewed();
            }
        },

        /**
         * 显示编辑器部分，退出只预览HTML
         * Exit preview html state
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        previewed : function() {

            var editor           = this.editor;
            var preview          = this.preview;
            var toolbar          = this.toolbar;
            var settings         = this.settings;
            var previewContainer = this.previewContainer;
            var previewCloseBtn  = editor.find("." + this.classPrefix + "preview-close-btn");

            this.state.preview   = false;

            this.codeMirror.show();

            if (settings.toolbar) {
                toolbar.show();
            }

            preview[(settings.watch) ? "show" : "hide"]();

            previewCloseBtn.hide().unbind(editormd.mouseOrTouch("click", "touchend"));

            previewContainer.removeClass(this.classPrefix + "preview-active");

            if (settings.watch)
            {
                previewContainer.css("padding", "20px");
            }

            preview.css({
                background : null,
                position   : "absolute",
                width      : editor.width() / 2,
                height     : (settings.autoHeight && !this.state.fullscreen) ? "auto" : editor.height() - toolbar.height(),
                top        : (settings.toolbar)    ? toolbar.height() : 0
            });

            this.syncPreviewScrolling();

            if (this.state.loaded)
            {
                $.proxy(settings.onpreviewed, this)();
            }

            return this;
        },

        /**
         * 编辑器全屏显示
         * Fullscreen show
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        fullscreen : function() {

            var _this            = this;
            var state            = this.state;
            var editor           = this.editor;
            var preview          = this.preview;
            var toolbar          = this.toolbar;
            var settings         = this.settings;
            var fullscreenClass  = this.classPrefix + "fullscreen";

            if (toolbar) {
                toolbar.find(".fa[name=fullscreen]").parent().toggleClass("active");
            }

            var escHandle = function(event) {
                if (!event.shiftKey && event.keyCode === 27)
                {
                    if (state.fullscreen)
                    {
                        _this.fullscreenExit();
                    }
                }
            };

            if (!editor.hasClass(fullscreenClass))
            {
                state.fullscreen = true;

                $("html,body").css("overflow", "hidden");

                editor.css({
                    width    : $(window).width(),
                    height   : $(window).height()
                }).addClass(fullscreenClass);

                this.resize();

                $.proxy(settings.onfullscreen, this)();

                // $(window).bind("keyup", escHandle);
            }
            else
            {
                // $(window).unbind("keyup", escHandle);
                this.fullscreenExit();
            }

            return this;
        },

        /**
         * 编辑器退出全屏显示
         * Exit fullscreen state
         *
         * @returns {editormd}         返回editormd的实例对象
         */

        fullscreenExit : function() {

            var editor            = this.editor;
            var settings          = this.settings;
            var toolbar           = this.toolbar;
            var fullscreenClass   = this.classPrefix + "fullscreen";

            this.state.fullscreen = false;

            if (toolbar) {
                toolbar.find(".fa[name=fullscreen]").parent().removeClass("active");
            }

            $("html,body").css("overflow", "auto");

            editor.css({
                width    : editor.data("oldWidth"),
                height   : editor.data("oldHeight")
            }).removeClass(fullscreenClass);

            this.resize();

            $.proxy(settings.onfullscreenExit, this)();

            return this;
        },

        /**
         * 加载并执行插件
         * Load and execute the plugin
         *
         * @param   {String}     name    plugin name / function name
         * @param   {String}     path    plugin load path
         * @returns {editormd}           返回editormd的实例对象
         */

        executePlugin : function(name, path) {

            var _this    = this;
            var cm       = this.cm;
            var settings = this.settings;

            path = settings.pluginPath + path;

            if (typeof define === "function")
            {
                if (typeof this[name] === "undefined")
                {
                    alert("Error: " + name + " plugin is not found, you are not load this plugin.");

                    return this;
                }

                this[name](cm);

                return this;
            }

            if ($.inArray(path, editormd.loadFiles.plugin) < 0)
            {
                editormd.loadPlugin(path, function() {
                    editormd.loadPlugins[name] = _this[name];
                    _this[name](cm);
                });
            }
            else
            {
                $.proxy(editormd.loadPlugins[name], this)(cm);
            }

            return this;
        },

        /**
         * 搜索替换
         * Search & replace
         *
         * @param   {String}     command    CodeMirror serach commands, "find, fintNext, fintPrev, clearSearch, replace, replaceAll"
         * @returns {editormd}              return this
         */

        search : function(command) {
            var settings = this.settings;

            if (!settings.searchReplace)
            {
                alert("Error: settings.searchReplace == false");
                return this;
            }

            if (!settings.readOnly)
            {
                this.cm.execCommand(command || "find");
            }

            return this;
        },

        searchReplace : function() {
            this.search("replace");

            return this;
        },

        searchReplaceAll : function() {
            this.search("replaceAll");

            return this;
        }
    };

    editormd.fn.init.prototype = editormd.fn;

    /**
     * 锁屏
     * lock screen when dialog opening
     *
     * @returns {void}
     */

    editormd.dialogLockScreen = function() {
        var settings = this.settings || {dialogLockScreen : true};

        if (settings.dialogLockScreen)
        {
            $("html,body").css("overflow", "hidden");
            this.resize();
        }
    };

    /**
     * 显示透明背景层
     * Display mask layer when dialog opening
     *
     * @param   {Object}     dialog    dialog jQuery object
     * @returns {void}
     */

    editormd.dialogShowMask = function(dialog) {
        var editor   = this.editor;
        var settings = this.settings || {dialogShowMask : true};

        dialog.css({
            top  : ($(window).height() - dialog.height()) / 2 + "px",
            left : ($(window).width()  - dialog.width())  / 2 + "px"
        });

        if (settings.dialogShowMask) {
            editor.children("." + this.classPrefix + "mask").css("z-index", parseInt(dialog.css("z-index")) - 1).show();
        }
    };

    editormd.toolbarHandlers = {
        undo : function() {
            this.cm.undo();
        },

        redo : function() {
            this.cm.redo();
        },

        bold : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("**" + selection + "**");

            if(selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
        },

        del : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("~~" + selection + "~~");

            if(selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
        },

        italic : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("*" + selection + "*");

            if(selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },

        quote : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();
            
            if (cursor.ch !== 0)
            {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("> " + selection);
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
            else
            {
                var selections = selection.split('\n');
                var content = "";
                for (var i = 0; i < selections.length; ++i) 
                {
                    content += "> " + selections[i] + "\n";
                }
                cm.replaceSelection(content);
            }

            // cm.replaceSelection("> " + selection);
            // cm.setCursor(cursor.line, (selection === "") ? cursor.ch + 2 : cursor.ch + selection.length + 2);
        },

        ucfirst : function() {
            var cm         = this.cm;
            var selection  = cm.getSelection();
            var selections = cm.listSelections();

            cm.replaceSelection(editormd.firstUpperCase(selection));
            cm.setSelections(selections);
        },

        ucwords : function() {
            var cm         = this.cm;
            var selection  = cm.getSelection();
            var selections = cm.listSelections();

            cm.replaceSelection(editormd.wordsFirstUpperCase(selection));
            cm.setSelections(selections);
        },

        uppercase : function() {
            var cm         = this.cm;
            var selection  = cm.getSelection();
            var selections = cm.listSelections();

            cm.replaceSelection(selection.toUpperCase());
            cm.setSelections(selections);
        },

        lowercase : function() {
            var cm         = this.cm;
            var cursor     = cm.getCursor();
            var selection  = cm.getSelection();
            var selections = cm.listSelections();

            cm.replaceSelection(selection.toLowerCase());
            cm.setSelections(selections);
        },

        h1 : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0)
            {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("# " + selection);
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
            else
            {
                cm.replaceSelection("# " + selection);
            }
        },

        h2 : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0)
            {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("## " + selection);
                cm.setCursor(cursor.line, cursor.ch + 3);
            }
            else
            {
                cm.replaceSelection("## " + selection);
            }
        },

        h3 : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0)
            {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("### " + selection);
                cm.setCursor(cursor.line, cursor.ch + 4);
            }
            else
            {
                cm.replaceSelection("### " + selection);
            }
        },

        h4 : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0)
            {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("#### " + selection);
                cm.setCursor(cursor.line, cursor.ch + 5);
            }
            else
            {
                cm.replaceSelection("#### " + selection);
            }
        },

        h5 : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0)
            {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("##### " + selection);
                cm.setCursor(cursor.line, cursor.ch + 6);
            }
            else
            {
                cm.replaceSelection("##### " + selection);
            }
        },

        h6 : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (cursor.ch !== 0)
            {
                cm.setCursor(cursor.line, 0);
                cm.replaceSelection("###### " + selection);
                cm.setCursor(cursor.line, cursor.ch + 7);
            }
            else
            {
                cm.replaceSelection("###### " + selection);
            }
        },

        "list-ul" : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (selection === "")
            {
                cm.replaceSelection("- " + selection);
            }
            else
            {
                var selectionText = selection.split("\n");

                for (var i = 0, len = selectionText.length; i < len; i++)
                {
                    selectionText[i] = (selectionText[i] === "") ? "" : "- " + selectionText[i];
                }

                cm.replaceSelection(selectionText.join("\n"));
            }
        },

        "list-ol" : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if(selection === "")
            {
                cm.replaceSelection("1. " + selection);
            }
            else
            {
                var selectionText = selection.split("\n");

                for (var i = 0, len = selectionText.length; i < len; i++)
                {
                    selectionText[i] = (selectionText[i] === "") ? "" : (i+1) + ". " + selectionText[i];
                }

                cm.replaceSelection(selectionText.join("\n"));
            }
        },

        hr : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection(((cursor.ch !== 0) ? "\n\n" : "\n") + "------------\n\n");
        },

        tex : function() {
            if (!this.settings.tex)
            {
                alert("settings.tex === false");
                return this;
            }

            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("$$" + selection + "$$");

            if(selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 2);
            }
        },

        link : function() {
            this.executePlugin("linkDialog", "link-dialog/link-dialog");
        },

        "reference-link" : function() {
            this.executePlugin("referenceLinkDialog", "reference-link-dialog/reference-link-dialog");
        },

        pagebreak : function() {
            if (!this.settings.pageBreak)
            {
                alert("settings.pageBreak === false");
                return this;
            }

            var cm        = this.cm;
            var selection = cm.getSelection();

            cm.replaceSelection("\r\n[========]\r\n");
        },

        image : function() {
            this.executePlugin("imageDialog", "image-dialog/image-dialog");
        },

        file : function() {
            this.executePlugin("fileDialog", "file-dialog/file-dialog");
        },

        code : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection("`" + selection + "`");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },

        "code-block" : function() {
            this.executePlugin("codeBlockDialog", "code-block-dialog/code-block-dialog");
        },

        "preformatted-text" : function() {
            this.executePlugin("preformattedTextDialog", "preformatted-text-dialog/preformatted-text-dialog");
        },

        table : function() {
            this.executePlugin("tableDialog", "table-dialog/table-dialog");
        },

        datetime : function() {
            var cm        = this.cm;
            var selection = cm.getSelection();
            var date      = new Date();
            var langName  = this.settings.lang.name;
            var datefmt   = editormd.dateFormat() + " " + editormd.dateFormat((langName === "zh-cn" || langName === "zh-tw") ? "cn-week-day" : "week-day");

            cm.replaceSelection(datefmt);
        },

        emoji : function() {
            this.executePlugin("emojiDialog", "emoji-dialog/emoji-dialog");
        },

        "html-entities" : function() {
            this.executePlugin("htmlEntitiesDialog", "html-entities-dialog/html-entities-dialog");
        },

        "goto-line" : function() {
            this.executePlugin("gotoLineDialog", "goto-line-dialog/goto-line-dialog");
        },

        watch : function() {
            this[this.settings.watch ? "unwatch" : "watch"]();
        },

        preview : function() {
            this.previewing();
        },

        fullscreen : function() {
            this.fullscreen();
        },

        clear : function() {
            this.clear();
        },

        search : function() {
            this.search();
        },

        help : function() {
            this.executePlugin("helpDialog", "help-dialog/help-dialog");
        },

        info : function() {            
            this.showInfoDialog();
        },

        options : function() {
            this.executePlugin("optionsDialog", "options-dialog/options-dialog");
        },

        extend_html : function() {
            // this.executePlugin("optionsDialog", "options-dialog/options-dialog");
            this.executePlugin("extendHtmlDialog", "extend-html-dialog/extend-html-dialog");
        }
    };

    editormd.keyMaps = {
        "Ctrl-1"       : "h1",
        "Ctrl-2"       : "h2",
        "Ctrl-3"       : "h3",
        "Ctrl-4"       : "h4",
        "Ctrl-5"       : "h5",
        "Ctrl-6"       : "h6",
        "Ctrl-B"       : "bold",  // if this is string ==  editormd.toolbarHandlers.xxxx
        "Ctrl-D"       : "datetime",

        "Ctrl-E"       : function() { // emoji
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (!this.settings.emoji)
            {
                alert("Error: settings.emoji == false");
                return ;
            }

            cm.replaceSelection(":" + selection + ":");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },
        "Ctrl-Alt-G"   : "goto-line",
        "Ctrl-H"       : "hr",
        "Ctrl-I"       : "italic",
        "Ctrl-K"       : "code",

        "Ctrl-L"        : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            var title = (selection === "") ? "" : " \""+selection+"\"";

            cm.replaceSelection("[" + selection + "]("+title+")");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },
        "Ctrl-U"         : "list-ul",

        "Shift-Ctrl-A"   : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            if (!this.settings.atLink)
            {
                alert("Error: settings.atLink == false");
                return ;
            }

            cm.replaceSelection("@" + selection);

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 1);
            }
        },

        "Shift-Ctrl-C"     : "code",
        "Shift-Ctrl-Q"     : "quote",
        "Shift-Ctrl-S"     : "del",
        "Shift-Ctrl-K"     : "tex",  // KaTeX

        "Shift-Alt-C"      : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            cm.replaceSelection(["```", selection, "```"].join("\n"));

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 3);
            }
        },

        "Shift-Ctrl-Alt-C" : "code-block",
        "Shift-Ctrl-H"     : "html-entities",
        "Shift-Alt-H"      : "help",
        "Shift-Ctrl-E"     : "emoji",
        "Shift-Ctrl-U"     : "uppercase",
        "Shift-Alt-U"      : "ucwords",
        "Shift-Ctrl-Alt-U" : "ucfirst",
        "Shift-Alt-L"      : "lowercase",

        "Shift-Ctrl-I"     : function() {
            var cm        = this.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();

            var title = (selection === "") ? "" : " \""+selection+"\"";

            cm.replaceSelection("![" + selection + "]("+title+")");

            if (selection === "") {
                cm.setCursor(cursor.line, cursor.ch + 4);
            }
        },

        "Shift-Ctrl-Alt-I" : "image",
        "Shift-Ctrl-L"     : "link",
        "Shift-Ctrl-O"     : "list-ol",
        "Shift-Ctrl-P"     : "preformatted-text",
        "Shift-Ctrl-T"     : "table",
        "Shift-Alt-P"      : "pagebreak",
        "F9"               : "watch",
        "F10"              : "preview",
        "F11"              : "fullscreen",
    };

    /**
     * 清除字符串两边的空格
     * Clear the space of strings both sides.
     *
     * @param   {String}    str            string
     * @returns {String}                   trimed string
     */

    var trim = function(str) {
        return (!String.prototype.trim) ? str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") : str.trim();
    };

    editormd.trim = trim;

    /**
     * 所有单词首字母大写
     * Words first to uppercase
     *
     * @param   {String}    str            string
     * @returns {String}                   string
     */

    var ucwords = function (str) {
        return str.toLowerCase().replace(/\b(\w)|\s(\w)/g, function($1) {
            return $1.toUpperCase();
        });
    };

    editormd.ucwords = editormd.wordsFirstUpperCase = ucwords;

    /**
     * 字符串首字母大写
     * Only string first char to uppercase
     *
     * @param   {String}    str            string
     * @returns {String}                   string
     */

    var firstUpperCase = function(str) {
        return str.toLowerCase().replace(/\b(\w)/, function($1){
            return $1.toUpperCase();
        });
    };

    var ucfirst = firstUpperCase;

    editormd.firstUpperCase = editormd.ucfirst = firstUpperCase;

    editormd.urls = {
        atLinkBase : "https://github.com/"
    };

    editormd.regexs = {
        atLink        : /@(\w+)/g,
        email         : /(\w+)@(\w+)\.(\w+)\.?(\w+)?/g,
        emailLink     : /(mailto:)?([\w\.\_]+)@(\w+)\.(\w+)\.?(\w+)?/g,
        emoji         : /:([\w\+-]+):/g,
        emojiDatetime : /(\d{1,2}:\d{1,2}:\d{1,2})/g,
        twemoji       : /:(tw-([\w]+)-?(\w+)?):/g,
        fontAwesome   : /:(fa-([\w]+)(-(\w+)){0,}):/g,
        editormdLogo  : /:(editormd-logo-?(\w+)?):/g,
        pageBreak     : /^\[[=]{8,}\]$/,
        footNoteRef   : /\[\^(.+?)\]/,
        footNoteDef   : /^\[\^(.+?)\]\:/,
    };

    // Emoji graphics files url path
    editormd.emoji     = {
        path : "../emoji/emojis/",
        // path  : "http://www.emoji-cheat-sheet.com/graphics/emojis/",
        ext   : ".png"
    };

    // Twitter Emoji (Twemoji)  graphics files url path
    editormd.twemoji = {
        path : "../emoji/twemoji/",
        // path : "http://twemoji.maxcdn.com/36x36/",
        ext  : ".png"
    };

    /**
     * 自定义marked的解析器
     * Custom Marked renderer rules
     *
     * @param   {Array}    markdownToC     传入用于接收TOC的数组
     * @returns {Renderer} markedRenderer  返回marked的Renderer自定义对象
     */

    editormd.markedRenderer = function(markdownToC, options) {
        var defaults = {
            toc                  : true,           // Table of contents
            tocm                 : false,
            tocStartLevel        : 1,              // Said from H1 to create ToC
            pageBreak            : true,
            atLink               : true,           // for @link
            emailLink            : true,           // for mail address auto link
            taskList             : false,          // Enable Github Flavored Markdown task lists
            emoji                : false,          // :emoji: , Support Twemoji, fontAwesome, Editor.md logo emojis.
            tex                  : false,          // TeX(LaTeX), based on KaTeX
            flowChart            : false,          // flowChart.js only support IE9+
            sequenceDiagram      : false,          // sequenceDiagram.js only support IE9+
        };

        var settings        = $.extend(defaults, options || {});
        var marked          = editormd.$marked;
        var markedRenderer  = new marked.Renderer();
        markdownToC         = markdownToC || [];

        var regexs          = editormd.regexs;
        var atLinkReg       = regexs.atLink;
        var emojiReg        = regexs.emoji;
        var emailReg        = regexs.email;
        var emailLinkReg    = regexs.emailLink;
        var twemojiReg      = regexs.twemoji;
        var faIconReg       = regexs.fontAwesome;
        var editormdLogoReg = regexs.editormdLogo;
        var pageBreakReg    = regexs.pageBreak;
        var footNoteRefReg  = regexs.footNoteRef;
        var footNoteDefReg  = regexs.footNoteDef;

        markedRenderer.emoji = function(text) {
            text = text.replace(editormd.regexs.emojiDatetime, function($1) {
                return $1.replace(/:/g, "&#58;");
            });

            var matchs = text.match(emojiReg);

            if (!matchs || !settings.emoji) {
                return text;
            }

            for (var i = 0, len = matchs.length; i < len; i++)
            {
                if (matchs[i] === ":+1:") {
                    matchs[i] = ":\\+1:";
                }

                text = text.replace(new RegExp(matchs[i]), function($1, $2){
                    var faMatchs = $1.match(faIconReg);
                    var name     = $1.replace(/:/g, "");

                    if (faMatchs)
                    {
                        for (var fa = 0, len1 = faMatchs.length; fa < len1; fa++)
                        {
                            var faName = faMatchs[fa].replace(/:/g, "");

                            return "<i class=\"fa " + faName + " fa-emoji\" title=\"" + faName.replace("fa-", "") + "\"></i>";
                        }
                    }
                    else
                    {
                        var emdlogoMathcs = $1.match(editormdLogoReg);
                        var twemojiMatchs = $1.match(twemojiReg);

                        if (emdlogoMathcs)
                        {
                            for (var x = 0, len2 = emdlogoMathcs.length; x < len2; x++)
                            {
                                var logoName = emdlogoMathcs[x].replace(/:/g, "");
                                return "<i class=\"" + logoName + "\" title=\"Editor.md logo (" + logoName + ")\"></i>";
                            }
                        }
                        else if (twemojiMatchs)
                        {
                            for (var t = 0, len3 = twemojiMatchs.length; t < len3; t++)
                            {
                                var twe = twemojiMatchs[t].replace(/:/g, "").replace("tw-", "");
                                return "<img src=\"" + settings.path + editormd.twemoji.path + twe + editormd.twemoji.ext + "\" title=\"twemoji-" + twe + "\" alt=\"twemoji-" + twe + "\" class=\"emoji twemoji\" />";
                            }
                        }
                        else
                        {
                            var src = (name === "+1") ? "plus1" : name;
                            src     = (src === "black_large_square") ? "black_square" : src;
                            src     = (src === "moon") ? "waxing_gibbous_moon" : src;

                            return "<img src=\"" + settings.path + editormd.emoji.path + src + editormd.emoji.ext + "\" class=\"emoji\" title=\"&#58;" + name + "&#58;\" alt=\"&#58;" + name + "&#58;\" />";
                        }
                    }
                });
            }
            return text;
        };

        markedRenderer.atLink = function(text) {
            if (atLinkReg.test(text))
            {
                if (settings.atLink)
                {
                    text = text.replace(emailReg, function($1, $2, $3, $4) {
                        return $1.replace(/@/g, "_#_&#64;_#_");
                    });

                    text = text.replace(atLinkReg, function($1, $2) {
                        return "<a target=\"_blank\" href=\"" + editormd.urls.atLinkBase + "" + $2 + "\" title=\"&#64;" + $2 + "\" class=\"at-link\">" + $1 + "</a>";
                    }).replace(/_#_&#64;_#_/g, "@");
                }

                if (settings.emailLink)
                {
                    text = text.replace(emailLinkReg, function($1, $2, $3, $4, $5) {
                        return (!$2 && $.inArray($5, "jpg|jpeg|png|gif|webp|ico|icon|pdf".split("|")) < 0) ? "<a target=\"_blank\" href=\"mailto:" + $1 + "\">"+$1+"</a>" : $1;
                    });
                }
                return text;
            }
            return text;
        };

        markedRenderer.footNote = function(text) {
            if (footNoteRefReg.test(text))
            {
                if (footNoteDefReg.test(text))
                {
                    var footNoteDefReg2 = /^\[\^(.+?)\]\:/g;
                    text = text.replace(footNoteDefReg2, function(wholeMatch, m1) {
                        var id = escape(m1);
                        var html = '<a href="#fnref:' + id + '" id="fn:' + id
                          + '" title="Return to article" class="reversefootnote">[' + m1
                          + ']:</a>';
                        return html;
                    });

                    return text;
                }

                var footNoteRefReg2 = /\[\^(.+?)\]/g;
                text = text.replace(footNoteRefReg2, function(wholeMatch, m1) {
                    var id = escape(m1);
                    var html = '<sup><a href="#fn:' + id + '" id="fnref:' + id
                      + '" title="See footnote" class="footnote">[' + m1
                      + ']</a></sup>';
                    return html;
                });

                return text;
            }

            return text;
        };

        markedRenderer.link = function (href, title, text) {
            if (this.options.sanitize) {
                try {
                    var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase();
                } catch(e) {
                    return "";
                }

                if (prot.indexOf("javascript:") === 0) {
                    return "";
                }
            }

            var targetAttr = "target=\"_blank\"";
            if (href.length > 0 && href[0] == '#')
            {
                targetAttr = "";
            }

            var out = "<a " + targetAttr + " href=\"" + href + "\"";

            if (atLinkReg.test(title) || atLinkReg.test(text))
            {
                if (title)
                {
                    out += " title=\"" + title.replace(/@/g, "&#64;");
                }

                return out + "\">" + text.replace(/@/g, "&#64;") + "</a>";
            }

            if (title) {
                out += " title=\"" + title + "\"";
            }

            out += ">" + text + "</a>";
            return out;
        };

        markedRenderer.heading = function(text, level, raw, line) {
            var linkText       = text;
            var hasLinkReg     = /\s*\<a\s*target=\"_blank\"\s*href\=\"(.*)\"\s*([^\>]*)\>(.*)\<\/a\>\s*/;
            var getLinkTextReg = /\s*\<a\s*([^\>]+)\>([^\>]*)\<\/a\>\s*/g;

            if (hasLinkReg.test(text))
            {
                var tempText = [];
                text         = text.split(/\<a\s*([^\>]+)\>([^\>]*)\<\/a\>/);

                for (var i = 0, len = text.length; i < len; i++)
                {
                    tempText.push(text[i].replace(/\s*target=\"_blank\"\s*href\=\"(.*)\"\s*/g, ""));
                }

                text = tempText.join(" ");
            }

            text = trim(text);

            var escapedText    = text.toLowerCase().replace(/[^\w]+/g, "-");
            var toc = {
                text  : text,
                level : level,
                slug  : escapedText,
                lineIdx : line,
            };

            //console.log(line);
            var isChinese = /^[\u4e00-\u9fa5]+$/.test(text);
            var id        = (isChinese) ? escape(text).replace(/\%/g, "") : text.toLowerCase().replace(/[^\w]+/g, "-");

            markdownToC.push(toc);

            // console.log(line);

            var headingHTML = "<h" + level + " id=\"h"+ level + "-" + this.options.headerPrefix + id + "\" data-source-line=\"" + line + "\">";

            headingHTML    += "<a name=\"" + text + "\" class=\"reference-link\"></a>";
            headingHTML    += "<span class=\"header-link octicon octicon-link\"></span>";
            headingHTML    += (hasLinkReg) ? this.atLink(this.emoji(this.footNote(linkText))) : this.atLink(this.emoji(this.footNote(text)));
            headingHTML    += "</h" + level + ">";

            return headingHTML;
        };

        markedRenderer.pageBreak = function(text) {
            if (pageBreakReg.test(text) && settings.pageBreak)
            {
                text = "<hr style=\"page-break-after:always;\" class=\"page-break editormd-page-break\" />";
            }

            return text;
        };

        markedRenderer.paragraph = function(text, line) {
            // var isTeXInline     = /\$(.*)\$/g.test(text);
            // var isTeXLine       = /^\$\$(.*)\$\$$/.test(text);
            //var isTeXAddClass   = (isTeXLine)     ? " class=\"" + editormd.classNames.tex + "\"" : "";
            var isTeXAddClass   = "";
            var isToC           = (settings.tocm) ? /^(\[TOC\]|\[TOCM\])$/.test(text) : /^\[TOC\]$/.test(text);
            var isToCMenu       = /^\[TOCM\]$/.test(text);

            // if (!isTeXLine && isTeXInline)
            // {
                // text = text.replace(/(\$\$([^\$]*)\$\$)+/g, function($1, $2) {
                    // return "<span class=\"" + editormd.classNames.tex + "\">" + $2.replace(/\$/g, "") + "</span>";
                // });
            // }
            // else if (isTeXLine)
            // {
                // text = text.replace(/\&/g, "");
                // text = (isTeXLine) ? text.replace(/\$/g, "") : text;
            // }

            var tocHTML = "<div class=\"markdown-toc editormd-markdown-toc\">" + text + "</div>";
            var dsl = "";
            if (typeof(line) != "undefined") {
                dsl = " data-source-line=\"" + line;
            }
            return (isToC) ? ( (isToCMenu) ? "<div class=\"editormd-toc-menu\">" + tocHTML + "</div><br/>" : tocHTML )
                           : ( (pageBreakReg.test(text)) ? this.pageBreak(text) : "<p" + isTeXAddClass + dsl +  "\">" + this.atLink(this.emoji(text)) + "</p>\n" );
        };

        markedRenderer.code = function (code, lang, escaped) {

            if (lang === "seq" || lang === "sequence")
            {
                return "<div class=\"sequence-diagram\">" + code + "</div>";
            }
            else if ( lang === "flow")
            {
                return "<div class=\"flowchart\">" + code + "</div>";
            }
            else if ( lang === "math")
            {
                return '<div class="math math-block">' + code + '</div>';
            }
            else
            {
                return marked.Renderer.prototype.code.apply(this, arguments);
            }
        };

        markedRenderer.codespan = function (code) {
            var match = code.match(/^\$+([^\$\n]+?)\$+$/);
            if (match) {
                return "<span class=\"math math-inline\">" + code + "</span>";
            } else {
                return "<code>" + code + "</code>";
            }
        }

        markedRenderer.tablecell = function(content, flags) {
            var type = (flags.header) ? "th" : "td";
            var tag  = (flags.align)  ? "<" + type +" style=\"text-align:" + flags.align + "\">" : "<" + type + ">";

            return tag + this.atLink(this.emoji(content)) + "</" + type + ">\n";
        };

        markedRenderer.list = function(body, ordered, line) {
            var dsl = "";
            if (typeof(line) != "undefined") {
                dsl = " data-source-line=\"" + line + "\"";
            }

            var type = ordered ? 'ol' : 'ul';
            return '<' + type + dsl + '>\n' + body + '</' + type + '>\n';
        };

        markedRenderer.listitem = function(text) {
            if (settings.taskList && /^\s*\[[x\s]\]\s*/.test(text))
            {
                text = text.replace(/^\s*\[\s\]\s*/, "<input type=\"checkbox\" class=\"task-list-item-checkbox\" /> ")
                           .replace(/^\s*\[x\]\s*/,  "<input type=\"checkbox\" class=\"task-list-item-checkbox\" checked disabled /> ");

                return "<li style=\"list-style: none;\">" + this.atLink(this.emoji(text)) + "</li>";
            }
            else
            {
                return "<li>" + this.atLink(this.emoji(text)) + "</li>";
            }
        };

        markedRenderer.table = function(header, body, line) {
            var dsl = "";
            if (typeof(line) != "undefined") {
                dsl = " data-source-line=\"" + line + "\"";
            }

            return '<table' + dsl + '>\n'
                + '<thead>\n'
                + header
                + '</thead>\n'
                + '<tbody>\n'
                + body
                + '</tbody>\n'
                + '</table>\n';
        };

        // markedRenderer.math = function(text) {
        //     console.log(text);
        //     return text;
        // };

        return markedRenderer;
    };

    /**
     *
     * 生成TOC(Table of Contents)
     * Creating ToC (Table of Contents)
     *
     * @param   {Array}    toc             从marked获取的TOC数组列表
     * @param   {Element}  container       插入TOC的容器元素
     * @param   {Integer}  startLevel      Hx 起始层级
     * @returns {Object}   tocContainer    返回ToC列表容器层的jQuery对象元素
     */

    editormd.markdownToCRenderer = function(toc, container, tocDropdown, startLevel) {

        var html        = "";
        var lastLevel   = 0;
        var classPrefix = this.classPrefix;

        startLevel      = startLevel  || 1;

        for (var i = 0, len = toc.length; i < len; i++)
        {
            var text  = toc[i].text;
            var level = toc[i].level;
            var line = toc[i].lineIdx;

            if (level < startLevel) {
                continue;
            }

            if (level > lastLevel)
            {
                html += "";

                if (level > (lastLevel + 1) )
                {
                    html += (new Array(level - lastLevel)).join("<ul>");
                }
            }
            else if (level < lastLevel)
            {
                html += (new Array(lastLevel - level + 2)).join("</ul></li>");
            }
            else
            {
                html += "</ul></li>";
            }

            html += "<li><a class=\"toc-level-" + level + "\" href=\"#" + text + "\" level=\"" + level + "\" lineIdx=\"" + line + "\">" + text + "</a><ul>";
            lastLevel = level;
        }

        var tocContainer = container.find(".markdown-toc");

        if ((tocContainer.length < 1 && container.attr("previewContainer") === "false"))
        {
            var tocHTML = "<div class=\"markdown-toc " + classPrefix + "markdown-toc\"></div>";

            tocHTML = (tocDropdown) ? "<div class=\"" + classPrefix + "toc-menu\">" + tocHTML + "</div>" : tocHTML;

            container.html(tocHTML);

            tocContainer = container.find(".markdown-toc");
        }

        if (tocDropdown)
        {
            tocContainer.wrap("<div class=\"" + classPrefix + "toc-menu\"></div><br/>");
        }

        tocContainer.html("<ul class=\"markdown-toc-list\"></ul>").children(".markdown-toc-list").html(html.replace(/\r?\n?\<ul\>\<\/ul\>/g, ""));

        return tocContainer;
    };

    /**
     *
     * 生成TOC下拉菜单
     * Creating ToC dropdown menu
     *
     * @param   {Object}   container       插入TOC的容器jQuery对象元素
     * @param   {String}   tocTitle        ToC title
     * @returns {Object}                   return toc-menu object
     */

    editormd.tocDropdownMenu = function(container, tocTitle) {

        tocTitle      = tocTitle || "Table of Contents";

        var zindex    = 400;
        var tocMenus  = container.find("." + this.classPrefix + "toc-menu");

        tocMenus.each(function() {
            var $this  = $(this);
            var toc    = $this.children(".markdown-toc");
            var icon   = "<i class=\"fa fa-angle-down\"></i>";
            var btn    = "<a href=\"javascript:;\" class=\"toc-menu-btn\">" + icon + tocTitle + "</a>";
            var menu   = toc.children("ul");
            var list   = menu.find("li");

            toc.append(btn);

            list.first().before("<li><h1>" + tocTitle + " " + icon + "</h1></li>");

            $this.mouseover(function(){
                menu.show();

                list.each(function(){
                    var li = $(this);
                    var ul = li.children("ul");

                    if (ul.html() === "")
                    {
                        ul.remove();
                    }

                    if (ul.length > 0 && ul.html() !== "")
                    {
                        var firstA = li.children("a").first();

                        if (firstA.children(".fa").length < 1)
                        {
                            firstA.append( $(icon).css({ float:"right", paddingTop:"4px" }) );
                        }
                    }

                    li.mouseover(function(){
                        ul.css("z-index", zindex).show();
                        zindex += 1;
                    }).mouseleave(function(){
                        ul.hide();
                    });
                });
            }).mouseleave(function(){
                menu.hide();
            });
        });

        return tocMenus;
    };

    /**
     * 简单地过滤指定的HTML标签
     * Filter custom html tags
     *
     * @param   {String}   html          要过滤HTML
     * @param   {String}   filters       要过滤的标签
     * @returns {String}   html          返回过滤的HTML
     */

    editormd.filterHTMLTags = function(html, filters) {

        if (typeof html !== "string") {
            html = new String(html);
        }

        if (typeof filters !== "string") {
            return html;
        }

        var expression = filters.split("|");
        var filterTags = expression[0].split(",");
        var attrs      = expression[1];

        for (var i = 0, len = filterTags.length; i < len; i++)
        {
            var tag = filterTags[i];

            html = html.replace(new RegExp("\<\s*" + tag + "\s*([^\>]*)\>([^\>]*)\<\s*\/" + tag + "\s*\>", "igm"), "");
        }

        return html;

        if (typeof attrs !== "undefined")
        {
            var htmlTagRegex = /\<(\w+)\s*([^\>]*)\>([^\>]*)\<\/(\w+)\>/ig;

            if (attrs === "*")
            {
                html = html.replace(htmlTagRegex, function($1, $2, $3, $4, $5) {
                    return "<" + $2 + ">" + $4 + "</" + $5 + ">";
                });
            }
            else if (attrs === "on*")
            {
                html = html.replace(htmlTagRegex, function($1, $2, $3, $4, $5) {
                    var el = $("<" + $2 + ">" + $4 + "</" + $5 + ">");
                    var _attrs = $($1)[0].attributes;
                    var $attrs = {};

                    $.each(_attrs, function(i, e) {
                        if (e.nodeName !== '"') $attrs[e.nodeName] = e.nodeValue;
                    });

                    $.each($attrs, function(i) {
                        if (i.indexOf("on") === 0) {
                            delete $attrs[i];
                        }
                    });

                    el.attr($attrs);

                    var text = (typeof el[1] !== "undefined") ? $(el[1]).text() : "";

                    return el[0].outerHTML + text;
                });
            }
            else
            {
                html = html.replace(htmlTagRegex, function($1, $2, $3, $4) {
                    var filterAttrs = attrs.split(",");
                    var el = $($1);
                    el.html($4);

                    $.each(filterAttrs, function(i) {
                        el.attr(filterAttrs[i], null);
                    });

                    return el[0].outerHTML;
                });
            }
        }

        return html;
    };

    /**
     * 将Markdown文档解析为HTML用于前台显示
     * Parse Markdown to HTML for Font-end preview.
     *
     * @param   {String}   id            用于显示HTML的对象ID
     * @param   {Object}   [options={}]  配置选项，可选
     * @returns {Object}   div           返回jQuery对象元素
     */

    editormd.markdownToHTML = function(id, options) {

        var defaults = {
            path                 : "",   //插件所在路径
            gfm                  : true,
            toc                  : true, //目录
            tocm                 : false,
            tocStartLevel        : 1,
            tocTitle             : "目录",
            tocDropdown          : false,  //下拉目录
            tocContainer         : "",  
            markdown             : "", 
            markdownSourceCode   : false,   
            htmlDecode           : "style,script,iframe|on*", //HTML标签解析 默认只过滤 script iframe
            autoLoadKaTeX        : false,     
            pageBreak            : false,   
            atLink               : false,    // for @link
            emailLink            : true,    // for mail address auto link
            tex                  : true,
            taskList             : true,   // Github Flavored Markdown task lists
            emoji                : false,
            flowChart            : false,    //流程图
            sequenceDiagram      : false,   // 时序/序列图
            previewCodeHighlight : true,   //代码高亮
            imageLazyLoad        : false,
            imageLazyLoadLoadingICON: `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`,

        };

        var div           = $("#" + id);
        var settings      = div.settings = $.extend(true, defaults, options || {});
        var saveTo        = div.find("textarea");

        var loadPath = settings.path;

        editormd.$marked  = marked;
                                            
        if (saveTo.length < 1)
        {
            div.append("<textarea></textarea>");
            saveTo        = div.find("textarea");
        }
    
        var markdownDoc   = (settings.markdown === "") ? saveTo.val() : settings.markdown;
        var markdownToC   = [];
    
        var rendererOptions = {
            path                 : settings.path,
            toc                  : settings.toc,
            tocm                 : settings.tocm,
            tocStartLevel        : settings.tocStartLevel,
            taskList             : settings.taskList,
            emoji                : settings.emoji,
            tex                  : settings.tex,
            pageBreak            : settings.pageBreak,
            atLink               : settings.atLink,           // for @link
            emailLink            : settings.emailLink,        // for mail address auto link
            flowChart            : settings.flowChart,
            sequenceDiagram      : settings.sequenceDiagram,
            previewCodeHighlight : settings.previewCodeHighlight,
        };
    
        var markedOptions = {
            renderer    : editormd.markedRenderer(markdownToC, rendererOptions),
            gfm         : settings.gfm,
            tables      : true,
            breaks      : true,
            pedantic    : false,
            sanitize    : settings.htmlDecode ? false : true, //false 开启HTML标签解析 
            smartLists  : true,
            smartypants : false,
            imageLazyLoad: settings.imageLazyLoad,
            imageLazyLoadLoadingICON: settings.imageLazyLoadLoadingICON,
            // mathDelimiters : [['$', '$'], ['\\(', '\\)'], ['\\[', '\\]'], ['$$', '$$'], 'beginend']
        };
        
        // markdownDoc = new String(markdownDoc);
        var markdownParsed = marked(markdownDoc, markedOptions);
        markdownParsed = editormd.filterHTMLTags(markdownParsed, settings.htmlDecode);
    
        if (settings.markdownSourceCode) {
            saveTo.text(markdownDoc);
        } else {
            saveTo.remove();
        }
    
        div.addClass("markdown-body " + editormd.classPrefix + "html-preview").append(markdownParsed);
    
        var tocContainer = (settings.tocContainer !== "") ? $(settings.tocContainer) : div;
    
        if (settings.tocContainer !== "")
        {
            tocContainer.attr("previewContainer", false);
        }
    
        if (settings.toc)
        {
            div.tocContainer = editormd.markdownToCRenderer(markdownToC, tocContainer, settings.tocDropdown, settings.tocStartLevel);
             
            if (settings.tocDropdown || div.find("." + editormd.classPrefix + "toc-menu").length > 0)
            {
                editormd.tocDropdownMenu(div, settings.tocTitle);
            }
    
            if (settings.tocContainer !== "")
            {
                div.find(".editormd-toc-menu, .editormd-markdown-toc").remove();
            }
        }

        // 代码高亮
        if (settings.previewCodeHighlight)
        {
            div.find("pre").addClass("snippet prettyprint linenums");
            prettyPrint();
            if (typeof window.Clipboard !== "undefined")
            {
                window.Clipboard.render(loadPath);
            }
            
        }
        
        //流程图 时序图
        // if (!editormd.isIE8)
        // {
        //     if (settings.flowChart) {
        //         div.find(".flowchart").flowChart();
        //     }
    
        //     if (settings.sequenceDiagram) {
        //         div.find(".sequence-diagram").sequenceDiagram({theme: "simple"});
        //     }
        // }

        if (settings.tex)
        {
            //弃用Katex
            // var katexHandle = function() {
            //     div.find("." + editormd.classNames.tex).each(function(){
            //         var tex  = $(this);
            //         katex.render(tex.html().replace(/&lt;/g, "<").replace(/&gt;/g, ">"), tex[0]);
            //         tex.find(".katex").css("font-size", "1.6em");
            //     });
            // };
    
            // if (settings.autoLoadKaTeX && !editormd.$katex && !editormd.kaTeXLoaded)
            // {
            //     this.loadKaTeX(function() {
            //         editormd.$katex      = katex;
            //         editormd.kaTeXLoaded = true;
            //         katexHandle();
            //     });
            // }
            // else
            // {
            //     katexHandle();
            // }

            MathJax.typeset();
        }

        if (settings.imageLazyLoad) {
            window.ScriptAction.imageLazyLoad();
        }
    
        div.getMarkdown = function() {
            return saveTo.val();
        };

        return div;

    };

    // Editor.md themes, change toolbar themes etc.
    // added @1.5.0
    editormd.themes        = ["default", "dark"];

    // Preview area themes
    // added @1.5.0
    editormd.previewThemes = ["default", "dark"];

    // CodeMirror / editor area themes
    // @1.5.0 rename -> editorThemes, old version -> themes
    editormd.editorThemes = [
        "default", "3024-day", "3024-night", "abcdef",
        "ambiance", "ambiance-mobile",
        "base16-dark", "base16-light", "bespin", "blackboard",
        "cobalt", "colorforth",
        "dracula", "duotone-dark", "duotone-light",
        "eclipse", "elegant", "erlang-dark",
        "hopscotch",
        "icecoder", "isotope",
        "lesser-dark", "liquibyte",
        "material", "mbo", "mdn-like", "midnight", "monokai",
        "neat", "neo", "night",
        "panda-syntax", "paraiso-dark", "paraiso-light", "pastel-on-dark",
        "railscasts", "rubyblue",
        "seti", "solarized",
        "the-matrix", "tomorrow-night-bright", "tomorrow-night-eighties", "ttcn", "twilight",
        "vibrant-ink",
        "xq-dark", "xq-light",
        "yeti",
        "zenburn"
    ];

    // 键盘模式
    editormd.keymapModes = ["default", "vim", "emacs", "sublime"];

    editormd.loadPlugins = {};

    editormd.loadFiles = {
        js     : [],
        css    : [],
        plugin : []
    };

    /**
     * 动态加载Editor.md插件，但不立即执行
     * Load editor.md plugins
     *
     * @param {String}   fileName              插件文件路径
     * @param {Function} [callback=function()] 加载成功后执行的回调函数
     * @param {String}   [into="head"]         嵌入页面的位置
     */

    editormd.loadPlugin = function(fileName, callback, into) {
        callback   = callback || function() {};

        this.loadScript(fileName, function() {
            editormd.loadFiles.plugin.push(fileName);
            callback();
        }, into);
    };

    /**
     * 动态加载CSS文件的方法
     * Load css file method
     *
     * @param {String}   fileName              CSS文件名
     * @param {Function} [callback=function()] 加载成功后执行的回调函数
     * @param {String}   [into="head"]         嵌入页面的位置
     */

    editormd.loadCSS   = function(fileName, callback, into) {
        into       = into     || "head";
        callback   = callback || function() {};
        var id     = (fileName + ".css").replace(/[\./]+/g, "-");

        if (document.getElementById(id)) {
            editormd.loadFiles.css.push(fileName);
            callback();
            return;
        }

        var css    = document.createElement("link");
        css.id     = id;
        css.type   = "text/css";
        css.rel    = "stylesheet";
        css.onload = css.onreadystatechange = function() {
            editormd.loadFiles.css.push(fileName);
            callback();
        };

        css.href   = fileName + ".css";

        if(into === "head") {
            document.getElementsByTagName("head")[0].appendChild(css);
        } else {
            document.body.appendChild(css);
        }
    };

    editormd.isIE    = (navigator.appName == "Microsoft Internet Explorer");
    editormd.isIE8   = (editormd.isIE && navigator.appVersion.match(/8./i) == "8.");

    /**
     * 动态加载JS文件的方法
     * Load javascript file method
     *
     * @param {String}   fileName              JS文件名
     * @param {Function} [callback=function()] 加载成功后执行的回调函数
     * @param {String}   [into="body"]         嵌入页面的位置
     */

    editormd.loadScript = function(fileName, callback, into, id, type) {

        into          = into     || "body";
        callback      = callback || function() {};
        id            = id       || (fileName + ".js").replace(/[\./]+/g, "-");
        type          = type     || "text/javascript";

        if (document.getElementById(id)) {
            editormd.loadFiles.js.push(fileName);
            callback();
            return
        }

        var script    = null;
        script        = document.createElement("script");
        script.id     = id;
        script.type   = type;
        script.src    = fileName + ".js";

        if (editormd.isIE8)
        {
            script.onreadystatechange = function() {
                if(script.readyState)
                {
                    if (script.readyState === "loaded" || script.readyState === "complete")
                    {
                        script.onreadystatechange = null;
                        editormd.loadFiles.js.push(fileName);
                        callback();
                    }
                }
            };
        }
        else
        {
            script.onload = function() {
                editormd.loadFiles.js.push(fileName);
                callback();
            };
        }

        if (into === "head") {
            document.getElementsByTagName("head")[0].appendChild(script);
        } else {
            document.body.appendChild(script);
        }
    };

    // 使用国外的CDN，加载速度有时会很慢，或者自定义URL
    // You can custom KaTeX load url.
    // editormd.katexURL  = {
    //     css : "katex/katex.min",
    //     js  : "katex/katex.min"
    // };

    // editormd.kaTeXLoaded = false;

    /**
     * 加载KaTeX文件
     * load KaTeX files
     *
     * @param {Function} [callback=function()]  加载成功后执行的回调函数
     */

    // editormd.loadKaTeX = function (path, callback) {
    //     editormd.loadCSS(path + editormd.katexURL.css, function(){
    //         editormd.loadScript(path + editormd.katexURL.js, callback || function(){});
    //     });
    // };

    editormd.MathJaxURL  = {
        configure : "mathjax/mathjax-configure",
        js  : "mathjax/es5/tex-chtml-full"
    };

    editormd.MathJaxLoaded = false;

    /**
     * 加载MathJax文件
     * load MathJax files
     *
     * @param {Function} [callback=function()]  加载成功后执行的回调函数
     */

    editormd.loadMathJax = function(path, callback) {
        editormd.loadScript(path + editormd.MathJaxURL.configure, function(){
            editormd.loadScript(path + editormd.MathJaxURL.js, function(){
                if (callback) callback();
            });
        });
    }

    /**
     * 锁屏
     * lock screen
     *
     * @param   {Boolean}   lock   Boolean 布尔值，是否锁屏
     * @returns {void}
     */

    editormd.lockScreen = function(lock) {
        $("html,body").css("overflow", (lock) ? "hidden" : "hidden");
    };

    /**
     * 动态创建对话框
     * Creating custom dialogs
     *
     * @param   {Object} options 配置项键值对 Key/Value
     * @returns {dialog} 返回创建的dialog的jQuery实例对象
     */

    editormd.createDialog = function(options) {
        var defaults = {
            name : "",
            width : 420,
            height: 240,
            title : "",
            drag  : true,
            closed : true,
            content : "",
            mask : true,
            maskStyle : {
                backgroundColor : "#fff",
                opacity : 0.1
            },
            lockScreen : true,
            footer : true,
            buttons : false
        };

        options          = $.extend(true, defaults, options);

        var $this        = this;
        var editor       = this.editor;
        var classPrefix  = editormd.classPrefix;
        var guid         = (new Date()).getTime();
        var dialogName   = ( (options.name === "") ? classPrefix + "dialog-" + guid : options.name);
        var mouseOrTouch = editormd.mouseOrTouch;

        var html         = "<div class=\"" + classPrefix + "dialog " + dialogName + "\">";

        if (options.title !== "")
        {
            html += "<div class=\"" + classPrefix + "dialog-header\"" + ( (options.drag) ? " style=\"cursor: move;\"" : "" ) + ">";
            html += "<strong class=\"" + classPrefix + "dialog-title\">" + options.title + "</strong>";
            html += "</div>";
        }

        if (options.closed)
        {
            html += "<a href=\"javascript:;\" class=\"fa fa-close " + classPrefix + "dialog-close\"></a>";
        }

        html += "<div class=\"" + classPrefix + "dialog-container\">" + options.content;

        if (options.footer || typeof options.footer === "string")
        {
            html += "<div class=\"" + classPrefix + "dialog-footer\">" + ( (typeof options.footer === "boolean") ? "" : options.footer) + "</div>";
        }

        html += "</div>";

        html += "<div class=\"" + classPrefix + "dialog-mask " + classPrefix + "dialog-mask-bg\"></div>";
        html += "<div class=\"" + classPrefix + "dialog-mask " + classPrefix + "dialog-mask-con\"></div>";
        html += "</div>";

        editor.append(html);

        var dialog = editor.find("." + dialogName);

        dialog.lockScreen = function(lock) {
            if (options.lockScreen)
            {
                $("html,body").css("overflow", (lock) ? "hidden" : "hidden");
                $this.resize();
            }

            return dialog;
        };

        dialog.showMask = function() {
            if (options.mask)
            {
                editor.find("." + classPrefix + "mask").css(options.maskStyle).css("z-index", editormd.dialogZindex - 1).show();
            }
            return dialog;
        };

        dialog.hideMask = function() {
            if (options.mask)
            {
                editor.find("." + classPrefix + "mask").hide();
            }

            return dialog;
        };

        dialog.loading = function(show) {
            var loading = dialog.find("." + classPrefix + "dialog-mask");
            loading[(show) ? "show" : "hide"]();

            return dialog;
        };

        dialog.lockScreen(true).showMask();

        dialog.show().css({
            zIndex : editormd.dialogZindex,
            border : (editormd.isIE8) ? "1px solid #ddd" : "",
            width  : (typeof options.width  === "number") ? options.width + "px"  : options.width,
            height : (typeof options.height === "number") ? options.height + "px" : options.height
        });

        var dialogPosition = function(){
            dialog.css({
                top    : ($(window).height() - dialog.height()) / 2 + "px",
                left   : ($(window).width() - dialog.width()) / 2 + "px"
            });
        };

        dialogPosition();

        $(window).resize(dialogPosition);

        dialog.children("." + classPrefix + "dialog-close").bind(mouseOrTouch("click", "touchend"), function() {
            dialog.hide().lockScreen(false).hideMask();
        });

        if (typeof options.buttons === "object")
        {
            var footer = dialog.footer = dialog.find("." + classPrefix + "dialog-footer");

            for (var key in options.buttons)
            {
                var btn = options.buttons[key];
                var btnClassName = classPrefix + key + "-btn";

                footer.append("<button class=\"" + classPrefix + "btn " + btnClassName + "\">" + btn[0] + "</button>");
                btn[1] = $.proxy(btn[1], dialog);
                footer.children("." + btnClassName).bind(mouseOrTouch("click", "touchend"), btn[1]);
            }
        }

        if (options.title !== "" && options.drag)
        {
            var posX, posY;
            var dialogHeader = dialog.children("." + classPrefix + "dialog-header");

            if (!options.mask) {
                dialogHeader.bind(mouseOrTouch("click", "touchend"), function(){
                    editormd.dialogZindex += 2;
                    dialog.css("z-index", editormd.dialogZindex);
                });
            }

            dialogHeader.mousedown(function(e) {
                e = e || window.event;  //IE
                posX = e.clientX - parseInt(dialog[0].style.left);
                posY = e.clientY - parseInt(dialog[0].style.top);

                document.onmousemove = moveAction;
            });

            var userCanSelect = function (obj) {
                obj.removeClass(classPrefix + "user-unselect").off("selectstart");
            };

            var userUnselect = function (obj) {
                obj.addClass(classPrefix + "user-unselect").on("selectstart", function(event) { // selectstart for IE
                    return false;
                });
            };

            var moveAction = function (e) {
                e = e || window.event;  //IE

                var left, top, nowLeft = parseInt(dialog[0].style.left), nowTop = parseInt(dialog[0].style.top);

                if( nowLeft >= 0 ) {
                    if( nowLeft + dialog.width() <= $(window).width()) {
                        left = e.clientX - posX;
                    } else {
                        left = $(window).width() - dialog.width();
                        document.onmousemove = null;
                    }
                } else {
                    left = 0;
                    document.onmousemove = null;
                }

                if( nowTop >= 0 ) {
                    top = e.clientY - posY;
                } else {
                    top = 0;
                    document.onmousemove = null;
                }


                document.onselectstart = function() {
                    return false;
                };

                userUnselect($("body"));
                userUnselect(dialog);
                dialog[0].style.left = left + "px";
                dialog[0].style.top  = top + "px";
            };

            document.onmouseup = function() {
                userCanSelect($("body"));
                userCanSelect(dialog);

                document.onselectstart = null;
                document.onmousemove = null;
            };

            dialogHeader.touchDraggable = function() {
                var offset = null;
                var start  = function(e) {
                    var orig = e.originalEvent;
                    var pos  = $(this).parent().position();

                    offset = {
                        x : orig.changedTouches[0].pageX - pos.left,
                        y : orig.changedTouches[0].pageY - pos.top
                    };
                };

                var move = function(e) {
                    e.preventDefault();
                    var orig = e.originalEvent;

                    $(this).parent().css({
                        top  : orig.changedTouches[0].pageY - offset.y,
                        left : orig.changedTouches[0].pageX - offset.x
                    });
                };

                this.bind("touchstart", start).bind("touchmove", move);
            };

            dialogHeader.touchDraggable();
        }

        editormd.dialogZindex += 2;

        return dialog;
    };

    /**
     * 鼠标和触摸事件的判断/选择方法
     * MouseEvent or TouchEvent type switch
     *
     * @param   {String} [mouseEventType="click"]    供选择的鼠标事件
     * @param   {String} [touchEventType="touchend"] 供选择的触摸事件
     * @returns {String} EventType                   返回事件类型名称
     */

    editormd.mouseOrTouch = function(mouseEventType, touchEventType) {
        mouseEventType = mouseEventType || "click";
        touchEventType = touchEventType || "touchend";

        var eventType  = mouseEventType;

        try {
            document.createEvent("TouchEvent");
            eventType = touchEventType;
        } catch(e) {}

        // https://github.com/pandao/editor.md/issues/203
        // https://github.com/pandao/editor.md/issues/246
        // 工具栏按钮无法点击的修复
        try {
            document.createEvent("MouseEvent");
            eventType = mouseEventType;
        } catch(e) {}

        return eventType;
    };

    /**
     * 日期时间的格式化方法
     * Datetime format method
     *
     * @param   {String}   [format=""]  日期时间的格式，类似PHP的格式
     * @returns {String}   datefmt      返回格式化后的日期时间字符串
     */

    editormd.dateFormat = function(format) {
        format      = format || "";

        var addZero = function(d) {
            return (d < 10) ? "0" + d : d;
        };

        var date    = new Date();
        var year    = date.getFullYear();
        var year2   = year.toString().slice(2, 4);
        var month   = addZero(date.getMonth() + 1);
        var day     = addZero(date.getDate());
        var weekDay = date.getDay();
        var hour    = addZero(date.getHours());
        var min     = addZero(date.getMinutes());
        var second  = addZero(date.getSeconds());
        var ms      = addZero(date.getMilliseconds());
        var datefmt = "";

        var ymd     = year2 + "-" + month + "-" + day;
        var fymd    = year  + "-" + month + "-" + day;
        var hms     = hour  + ":" + min   + ":" + second;

        switch (format)
        {
            case "UNIX Time" :
                    datefmt = date.getTime();
                break;

            case "UTC" :
                    datefmt = date.toUTCString();
                break;

            case "yy" :
                    datefmt = year2;
                break;

            case "year" :
            case "yyyy" :
                    datefmt = year;
                break;

            case "month" :
            case "mm" :
                    datefmt = month;
                break;

            case "cn-week-day" :
            case "cn-wd" :
                    var cnWeekDays = ["日", "一", "二", "三", "四", "五", "六"];
                    datefmt = "星期" + cnWeekDays[weekDay];
                break;

            case "week-day" :
            case "wd" :
                    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    datefmt = weekDays[weekDay];
                break;

            case "day" :
            case "dd" :
                    datefmt = day;
                break;

            case "hour" :
            case "hh" :
                    datefmt = hour;
                break;

            case "min" :
            case "ii" :
                    datefmt = min;
                break;

            case "second" :
            case "ss" :
                    datefmt = second;
                break;

            case "ms" :
                    datefmt = ms;
                break;

            case "yy-mm-dd" :
                    datefmt = ymd;
                break;

            case "yyyy-mm-dd" :
                    datefmt = fymd;
                break;

            case "yyyy-mm-dd h:i:s ms" :
            case "full + ms" :
                    datefmt = fymd + " " + hms + " " + ms;
                break;

            case "full" :
            case "yyyy-mm-dd h:i:s" :
                default:
                    datefmt = fymd + " " + hms;
                break;
        }

        return datefmt;
    };

    return editormd;

}));
