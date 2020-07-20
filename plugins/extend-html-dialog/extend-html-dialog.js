
(function() {

    var factory = function (exports) {

        var $            = jQuery;
        var pluginName   = "extend-html-dialog";

        var langs = {
            "zh-cn" : {
                dialog : {
                    options : {
                        title : "扩展语法",
                        grammar : "语法",
                    },
                }
            }
        };
        
        var options = {
            grammar: {
                all : [
                    "SPAN",
                    "BLOCK",
                    "DETAILS",
                    "TABBED",
                ],
                curValue : "SPAN"
            },
        };

        exports.fn.extendHtmlDialog = function() {
            var _this       = this;
            var cm          = this.cm;
            var editor      = this.editor;
            var settings    = this.settings;
            var path        = settings.path + "../plugins/" + pluginName +"/";
            var classPrefix = this.classPrefix;
            var dialogName  = classPrefix + pluginName, dialog;

            $.extend(true, this.lang, langs[this.lang.name]);

            var lang        = this.lang;
            var dialogLang  = lang.dialog.options;

            var dialogContent = `
            <div class="editormd-form" style="padding: 6px 0;height: auto;overflow: hidden; overflow-y: auto;">
            <label style="width:120px;">${dialogLang.grammar}</label>
            <select id="edit-toolbar-area-extend-html-grammar-select" style="width:240px;margin:3px 0 0 0;"></select><br/>
            <div id="editormd-extend-html-SPAN" >
            <label style="width:120px">color</label>
            <input id="editormd-extend-html-SPAN-color" type="text" value="#fff566" style="width:240px;margin:3px 0 0 0;"/>
            <br/>
            <label style="width:120px">font-size</label>
            <input id="editormd-extend-html-SPAN-font-size" type="text" value="15px" style="width:240px;margin:3px 0 0 0;"/>
            <br/>
            <label style="width:120px">font-family</label>
            <input id="editormd-extend-html-SPAN-font-family" type="text" value="Georgia" style="width:240px;margin:3px 0 0 0;"/> 
            </div>
            <div id="editormd-extend-html-BLOCK" style="display:none">
            <label style="width:120px">border-color</label>
            <input id="editormd-extend-html-BLOCK-border-color" type="text" value="rgba(45, 112, 145, 0.3)" style="width:240px;margin:3px 0 0 0;"/>
            <br/>
            <label style="width:120px">background-color</label>
            <input id="editormd-extend-html-BLOCK-background-color" type="text" value="#ebf7fd" style="width:240px;margin:3px 0 0 0;"/>             
            </div>
            <div id="editormd-extend-html-DETAILS" style="display:none">
            <label style="width:120px;">class</label>
            <select id="editormd-extend-html-DETAILS-class" style="width:240px;margin:3px 0 0 0;">
            ${["info", "danger", "success", "note"].map(item => {
                var selected = (item == "info") ? `selected="selected"` : ``;
                return `<option value="${item}" ${selected}>${item}</option>`;
            })}
            </select><br/>
            <label style="width:120px;">open</label>
            <select id="editormd-extend-html-DETAILS-open" style="width:240px;margin:3px 0 0 0;">
            ${["Y", "N"].map(item => {
                var selected = (item == "N") ? `selected="selected"` : ``;
                return `<option value="${item}" ${selected}>${item}</option>`;
            })}
            </select><br/>
            <label style="width:120px">summary</label>
            <input id="editormd-extend-html-DETAILS-summary" type="text" value="" style="width:240px;margin:3px 0 0 0;"/>         
            </div>
            <div id="editormd-extend-html-TABBED" style="display:none">
            <label style="width:120px">标签数量</label>
            <input id="editormd-extend-html-TABBED-num" type="text" value="2" style="width:240px;margin:3px 0 0 0;"/>
            <br/>
            <label style="width:120px">默认标签</label>
            <input id="editormd-extend-html-TABBED-default" type="text" value="1" style="width:240px;margin:3px 0 0 0;"/>
            </div>
            </div>
            `;

            if (editor.find("." + dialogName).length > 0) {
                dialog = editor.find("." + dialogName);
                this.dialogShowMask(dialog);
                this.dialogLockScreen();
                dialog.show();
            } else {
                dialog = this.createDialog({
                    name       : dialogName,
                    title      : dialogLang.title,
                    width      : 420,
                    height     : 'auto',
                    mask       : settings.dialogShowMask,
                    drag       : settings.dialogDraggable,
                    content    : dialogContent,
                    lockScreen : settings.dialogLockScreen,
                    maskStyle  : {
                        opacity         : settings.dialogMaskOpacity,
                        backgroundColor : settings.dialogMaskBgColor
                    },
                    buttons    : {
                        enter : [lang.buttons.enter, function() {
                            var now = $("#edit-toolbar-area-extend-html-grammar-select").val();
                            var selection = cm.getSelection();
                            if (now == "SPAN") {
                                var color = $("#editormd-extend-html-SPAN-color").val();
                                color = (color === "") ? "" : `background-color:${color};`;
                                var font_size = $("#editormd-extend-html-SPAN-font-size").val();
                                font_size = (font_size === "") ? "" : `font-size:${font_size};`;
                                var font_family = $("#editormd-extend-html-SPAN-font-family").val();
                                font_family = (font_family === "") ? "" : `font-family:${font_family};`;
                                var style = [color, font_size, font_family].join("");
                                style = (style === "") ? "" : ` style="${style}"`;
                                cm.replaceSelection(`<span${style}>${selection}</span>`);
                            } else if (now == "BLOCK") {
                                var border_color = $("#editormd-extend-html-BLOCK-border-color").val();
                                var background_color = $("#editormd-extend-html-BLOCK-background-color").val();
                                cm.replaceSelection(
`
<div style="border: .3em solid ${border_color};border-radius: 1em;background-color: ${background_color};margin: 5px;padding: 10px 10px 0px;width: 100%;">

${selection}

</div>`
                                );
                            } else if (now == "DETAILS") {
                                var _class = $("#editormd-extend-html-DETAILS-class").val();
                                var _open = $("#editormd-extend-html-DETAILS-open").val() === "Y" ? " open" : "";
                                var _summary = $("#editormd-extend-html-DETAILS-summary").val();
                                cm.replaceSelection(
`<details class="${_class}"${_open}><summary>${_summary}</summary><div>

${selection}

</div></details>`
                                );
                            } else if (now == "TABBED") {
                                var timestamp = new Date().getTime();
                                var _num = parseInt($("#editormd-extend-html-TABBED-num").val());
                                if (_num < 1) _num = 1;
                                var _default = parseInt($("#editormd-extend-html-TABBED-default").val());
                                if (_default > _num) _default = _num;
                                if (_default < 1) _default = 1;
                                cm.replaceSelection(
`${[_num].map(_num => {
    var html = "";
    for (var i = 1; i <= _num; ++i) {
        var checked = (_default == i) ? "checked ":"";
        var _selection = (i == 1) ? selection : "";
        var addon = (i == 1) ? "<div class=\"tabbed-set\">" : "</div>";
        html += `
${addon}<input ${checked}id="__tabbed_${timestamp}_${i}" name="__tabbed_${timestamp}" type="radio"><label for="__tabbed_${timestamp}_${i}">${`标签${i}`}</label><div class="tabbed-content">

${_selection}

`;
    }
    return html;
})}
</div></div>
`    
                                );
                            }
                            this.hide().lockScreen(false).hideMask();
                            return false;
                        }],

                        cancel : [lang.buttons.cancel, function() {
                            this.hide().lockScreen(false).hideMask();
                            return false;
                        }]
                    }
                });
            }

            function addSelect(id, options, curValue) {
                var select = dialog.find(id);

                if (select.html() === "") {
                    options.forEach(option => {
                        var selected = (option == curValue) ? `selected="selected"` : ``;
                        select.append(`<option value="${option}" ${selected}>${option}</option>`);
                    });
                }

                return select;
            }

            addSelect("#edit-toolbar-area-extend-html-grammar-select", options.grammar.all, options.grammar.curValue);

            $("#edit-toolbar-area-extend-html-grammar-select").change((e) => {
                var now = $("#edit-toolbar-area-extend-html-grammar-select").val();
                (() => {
                    options.grammar.all.forEach(id => $(`#editormd-extend-html-${id}`).hide());
                })();
                $(`#editormd-extend-html-${now}`).show();
            })
        };

    };

    // CommonJS/Node.js
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    {
        module.exports = factory;
    }
    else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
        if (define.amd) { // for Require.js

            define(["editormd"], function(editormd) {
                factory(editormd);
            });

        } else { // for Sea.js
            define(function(require) {
                var editormd = require("./../../editormd");
                factory(editormd);
            });
        }
    }
    else
    {
        factory(window.editormd);
    }

})();
