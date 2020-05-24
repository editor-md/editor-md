

window.onload = function(){
    var HTML = "<!DOCTYPE html>\n" + $('html').prop("outerHTML");
    var scr = [
        "<script src=\"./jquery-3.5.1.min.js\"></script>",
        "<script src=\"Editor.md/js/editormd.min.js\"></script>",
        "<script src=\"Editor.md/lib/mathjax/mathjax-configure.js\"></script>",
        "<script src=\"Editor.md/lib/mathjax/es5/tex-svg.js\"></script>",
        "<script src=\"./md_editor_show.js\"></script>",
        "<script src=\"Editor.md/js/plugins.min.js\"></script>",
        // "/<style type=\"text/css\">.*<\/style>/g"
        // "<script src=\"./to_html.js\"></script>",
    ];
    for (var i = 0; i < scr.length; ++i) {
        HTML = HTML.replace(scr[i], "");
    }
    HTML = HTML.replace("<link rel=\"stylesheet\" href=\"Editor.md/css/editormd.min.css\">", "<link rel=\"stylesheet\" href=\"./css/main.min.css\">");
    HTML = HTML.replace("<script src=\"./to_html.js\"></script>", "<script src = './js/main.min.js'></script>\n");
    console.log(HTML);
};