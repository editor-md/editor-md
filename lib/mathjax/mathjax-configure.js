


MathJax = {
    loader: {
        load: ['input/tex-base', 'output/svg', 'ui/menu', '[tex]/require']
      },
    tex: {
      inlineMath: [
        ['$', '$'],
      ],
      displayMath: [
        ['$$', '$$'],
      ],
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

