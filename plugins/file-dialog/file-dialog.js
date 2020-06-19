/*!
 * Image (upload) dialog plugin for Editor.md
 *
 * @file        file-dialog.js
 * @author      dup4
 * @version     2.0.0
 * @updateTime  2020-05-25
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

    var factory = function (exports) {

		var pluginName   = "file-dialog";
		exports.fn.fileDialog = function() {
            var _this       = this;
            var cm          = this.cm;
            var lang        = this.lang;
            var editor      = this.editor;
            var settings    = this.settings;
            var cursor      = cm.getCursor();
            var selection   = cm.getSelection();
            var fileLang   = lang.dialog.file;
            var classPrefix = this.classPrefix;
            var dialogName  = classPrefix + pluginName, dialog;

            cm.focus();
            
            var loading = function(show) {
                var _loading = dialog.find("." + classPrefix + "dialog-mask");
                _loading[(show) ? "show" : "hide"]();
            };

            var uploadFileAjax = function(file) {
                    if (!file) return;
                    loading(true);
                    var fileName = file.name;

					if (fileName === "") {
                        alert(fileLang.uploadFileEmpty);
                        loading(false); 
                        return false;
					}

                    var fdata = new FormData();
                    fdata.append('file', file);
                    var action = settings.uploadURL + (settings.uploadURL.indexOf("?") >= 0 ? "&" : "?") + "&id=" + _this.id;
                    $.ajax({
                        type : "POST",
                        url : action,
                        data: fdata, 
                        cache: false,
                        contentType: false,    //不可缺
                        processData: false,    //不可缺
                        success : function(json) { 
                            loading(false); 
                            if (json.success === 1) {
                                dialog.find("[data-url]").val(json.url);
                            } else {
                                alert(json.message);
                            }
                        },
                        complete : function() {
                            loading(false);
                            // console.log("ajax complete!");
                        },
                        error : function(xmlrqst, info) {
                            loading(false);
                            // console.log("error");
                        },
                    });
            };

            if (editor.find("." + dialogName).length < 1) {
                var guid   = (new Date).getTime();
                var dialogContent = ( (settings.fileUpload) ? "<form " +
                                        "class=\"" + classPrefix + "form\">" : "<div class=\"" + classPrefix + "form\">" ) +
                                        "<label>" + fileLang.url + "</label>" +
                                        "<input type=\"text\" data-url />" + (function(){
                                            return (settings.fileUpload) ? "<div class=\"" + classPrefix + "file-input\">" +
                                                                                "<input type=\"file\" name=\"" + classPrefix + "upload-file\" />" +
                                                                                "<input type=\"submit\" value=\"" + fileLang.uploadButton + "\" />" +
                                                                            "</div>" : "";
                                        })() +
                                        "<br/>" +
                                        "<label>" + fileLang.alt + "</label>" +
                                        "<input type=\"text\" value=\"" + selection + "\" data-alt />" +
                                        "<br/>" +
                                    ( (settings.fileUpload) ? "</form>" : "</div>");

                dialog = this.createDialog({
                    title      : fileLang.title,
                    width      : (settings.fileUpload) ? 465 : 380,
                    height     : 214,
                    name       : dialogName,
                    content    : dialogContent,
                    mask       : settings.dialogShowMask,
                    drag       : settings.dialogDraggable,
                    lockScreen : settings.dialogLockScreen,
                    maskStyle  : {
                        opacity         : settings.dialogMaskOpacity,
                        backgroundColor : settings.dialogMaskBgColor
                    },
                    buttons : {
                        enter : [lang.buttons.enter, function() {
                            var url  = this.find("[data-url]").val();
                            var alt  = this.find("[data-alt]").val();

                            if (url === "") {
                                alert(imageLang.imageURLEmpty);
                                return false;
                            }

							var altAttr = (alt !== "") ? " \"" + alt + "\"" : "";
                            cm.replaceSelection("\n\n[" + (alt === "" ? "附件描述" : alt) + "](" + url + ")\n\n");
                            this.hide().lockScreen(false).hideMask();
                            //删除对话框
                            this.remove();
                            return false;
                        }],

                        cancel : [lang.buttons.cancel, function() {
                            this.hide().lockScreen(false).hideMask();
                            //删除对话框
                            this.remove();
                            return false;
                        }]
                    }
                });

                dialog.attr("id", classPrefix + "file-dialog-" + guid);

				if (!settings.fileUpload) return;

				var fileInput  = dialog.find("[name=\"" + classPrefix + "upload-file\"]");

				fileInput.bind("change", function() {
                    return uploadFileAjax(fileInput[0].files[0]);
                });
            }

			dialog = editor.find("." + dialogName);
			dialog.find("[type=\"text\"]").val("");
            dialog.find("[type=\"file\"]").val("");            
			this.dialogShowMask(dialog);
			this.dialogLockScreen();
            dialog.show();
            if (_this.uploadFile.length > 0) {
                uploadFileAjax(_this.uploadFile.shift());
            }
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
