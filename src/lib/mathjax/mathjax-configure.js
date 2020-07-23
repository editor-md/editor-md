


MathJax = {
    // loader: {
    //     load: ['input/tex-full', 'output/svg', 'ui/menu', '[tex]/require']
    //   },
    tex: {
      inlineMath: [
        // ['\\(', '\\)'],
        ['$', '$'],
      ],
      displayMath: [
        // ['\\[', '\\]'],
        ['$$', '$$'],
      ],
    },
    options: {
      // skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre','code', 'a', 'annotation', 'annotation-xml'],
      ignoreHtmlClass: 'tex_ignore|editormd-html-preview',
      processHtmlClass: "editormd-preview-container",
    },
    startup: {
        ready: () => {
          MathJax.startup.defaultReady();
          MathJax.startup.promise.then(() => {
            //渲染完毕后的回调
          });
        }
      },
};

