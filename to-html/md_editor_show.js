var Editor;

$(function() {
    var config = {
        path : "./Editor.md/lib/",
    };
    editormd.markdownToHTML("editormd-view", config);
    // window.onload = function(){
    //     console.log($('body').html());
    // };
    
});

