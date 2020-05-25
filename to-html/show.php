
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" href="Editor.md/css/editormd.min.css" />
</head>

    <body style="overflow:scroll; ">
            <div id="editormd-view" style = "max-width:1280px; margin:auto;">
                <textarea id="append-test" style="display:none; ">
                    <?php require("./test.md"); ?>
                </textarea>
            </div>
    </body>

</html>

<script src="./jquery-3.5.1.min.js"></script>
<script src="Editor.md/lib/mathjax/mathjax-configure.js"></script>
<script src="Editor.md/lib/mathjax/es5/tex-svg.js"></script>
<script src="Editor.md/js/plugins.min.js"></script>
<script src="Editor.md/js/editormd.min.js"></script>
<script src="./md_editor_show.js"></script>
<script src="./to_html.js"></script>
