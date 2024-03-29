
// plugin.js 加载后初始化工作

(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory(root);
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.ScriptAction = factory(root);
    }
}) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    "use strict";

    if (typeof define === "function" && define.amd){
        root = window;
    }

    function snipperAction() {
        // 代码块剪贴板
        window.Clipboard.snipperAction();
    }

    function imageLazyLoad() {
        // 图片懒加载
        var images = document.querySelectorAll(".lazyload");
        new LazyLoad(images);
    }

    function forceLoadImg() {
        var images = document.querySelectorAll(".lazyload");
        Array.prototype.forEach.call(images, function (image) {
            var src = image.dataset.src;
            var srcset = image.dataset.srcset;
            if ("img" === image.tagName.toLowerCase()) {
                if (src) {
                    image.src = src;
                }
                if (srcset) {
                    image.srcset = srcset;
                }
            } else {
                image.style.backgroundImage = "url('" + src + "')";
            }
        });
    }

    function gao() {
        snipperAction();
        imageLazyLoad();
    }

    return {
        snipperAction: snipperAction,
        imageLazyLoad: imageLazyLoad,
        gao: gao,
        forceLoadImg: forceLoadImg,
    }
});


