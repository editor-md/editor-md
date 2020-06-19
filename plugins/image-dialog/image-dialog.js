/*!
 * Image (upload) dialog plugin for Editor.md
 *
 * @file        image-dialog.js
 * @author      pandao
 * @version     1.3.4
 * @updateTime  2015-06-09
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

    var factory = function (exports) {

		var pluginName   = "image-dialog";
		exports.fn.imageDialog = function() {
            var _this       = this;
            var cm          = this.cm;
            var lang        = this.lang;
            var editor      = this.editor;
            var settings    = this.settings;
            var cursor      = cm.getCursor();
            var selection   = cm.getSelection();
            var imageLang   = lang.dialog.image;
            var classPrefix = this.classPrefix;
            var iframeName  = classPrefix + "image-iframe";
            var dialogName  = classPrefix + pluginName, dialog;

            cm.focus();
            
            var loading = function(show) {
                var _loading = dialog.find("." + classPrefix + "dialog-mask");
                _loading[(show) ? "show" : "hide"]();
            };

            var uploadImgAjax = function(file) {
                    if (!file) return;
                    loading(true);
                    var fileName = file.name;
                    var fileSize = file.size;
                    var fileType = file.type; 
                    // console.log(fileName, fileSize, fileType);
					var isImage   = new RegExp("(\\.(" + settings.imageFormats.join("|") + "))$", "i"); // /(\.(webp|jpg|jpeg|gif|bmp|png))$/
                    var MAXFILESIZE = 16777216;

					if (fileName === "") {
                        alert(imageLang.uploadFileEmpty);
                        loading(false); 
                        return false;
					}

                    if (!isImage.test(fileName)) {
                        alert(imageLang.formatNotAllowed + settings.imageFormats.join(", "));
                        loading(false); 
                        return false;
					}

                    var fdata = new FormData();
                    if((fileSize > 0 && fileSize <= MAXFILESIZE)) {
                        fdata.append('file', file);
                    } else{ 
                        alert(imageLang.imageOverSize);
                        loading(false); 
                        return false;
                    } 
                    
                    var action = settings.uploadURL + (settings.uploadURL.indexOf("?") >= 0 ? "&" : "?") + "&id=" + _this.id;
                    if (settings.crossDomainUpload) {
                        action += "&callback=" + settings.uploadCallbackURL + "&dialog_id=editormd-image-dialog-" + guid;
                    }
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
                                // dialog.find("[data-link]").val(json.url);
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
                var dialogContent = ( (settings.imageUpload) ? "<form " +
                                        // "action=\"" + action +"\"" +
                                        // "target=\"" + iframeName + "\" " + 
                                        // "method=\"post\" " +
                                        // "enctype=\"multipart/form-data\" " + 
                                        "class=\"" + classPrefix + "form\">" : "<div class=\"" + classPrefix + "form\">" ) +
                                        // ( (settings.imageUpload) ? "<iframe name=\"" + iframeName + "\" id=\"" + iframeName + "\" guid=\"" + guid + "\"></iframe>" : "" ) +
                                        "<label>" + imageLang.url + "</label>" +
                                        "<input type=\"text\" data-url />" + (function(){
                                            return (settings.imageUpload) ? "<div class=\"" + classPrefix + "file-input\">" +
                                                                                "<input type=\"file\" name=\"" + classPrefix + "image-file\" accept=\"image/*\" />" +
                                                                                "<input type=\"submit\" value=\"" + imageLang.uploadButton + "\" />" +
                                                                            "</div>" : "";
                                        })() +
                                        "<br/>" +
                                        "<label>" + imageLang.alt + "</label>" +
                                        "<input type=\"text\" value=\"" + selection + "\" data-alt />" +
                                        "<br/>" +
                                        // "<label>" + imageLang.link + "</label>" +
                                        // "<input type=\"text\" value=\"\" data-link />" +
                                        // "<br/>" +
                                    ( (settings.imageUpload) ? "</form>" : "</div>");

                //var imageFooterHTML = "<button class=\"" + classPrefix + "btn " + classPrefix + "image-manager-btn\" style=\"float:left;\">" + imageLang.managerButton + "</button>";

                dialog = this.createDialog({
                    title      : imageLang.title,
                    width      : (settings.imageUpload) ? 465 : 380,
                    height     : 220,
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
                            var link = "";
                            // var link = this.find("[data-link]").val();

                            if (url === "")
                            {
                                alert(imageLang.imageURLEmpty);
                                return false;
                            }

							var altAttr = (alt !== "") ? " \"" + alt + "\"" : "";

                            if (link === "")
                            {
                                cm.replaceSelection("\n\n![" + alt + "](" + url + altAttr + ")\n\n");
                            }
                            else
                            {
                                cm.replaceSelection("\n\n[![" + alt + "](" + url + altAttr + ")](" + link + altAttr + ")\n\n");
                            }
                            
                            if (alt === "") {
                                cm.setCursor(cursor.line, cursor.ch + 2);
                            }

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

                dialog.attr("id", classPrefix + "image-dialog-" + guid);

				if (!settings.imageUpload) {
                    return;
                }

				var fileInput  = dialog.find("[name=\"" + classPrefix + "image-file\"]");

				fileInput.bind("change", function() {
                    return uploadImgAjax(fileInput[0].files[0]);
                    // dialog.find("[type=\"submit\"]").bind("click", submitHandler).trigger("click");
                });
            }

			dialog = editor.find("." + dialogName);
			dialog.find("[type=\"text\"]").val("");
            dialog.find("[type=\"file\"]").val("");            
            // dialog.find("[data-link]").val("http://");

			this.dialogShowMask(dialog);
			this.dialogLockScreen();
            dialog.show();
            if (_this.uploadImg.length > 0) {
                uploadImgAjax(_this.uploadImg.shift());
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
