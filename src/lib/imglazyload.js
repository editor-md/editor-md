
// function ImgLazyLoad() {
// 	var lazyImages = [].slice.call(document.querySelectorAll(".lazy-load-img"));
// 	if ("IntersectionObserver" in window) {
// 	  let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
// 		entries.forEach(function(entry) {
// 		  if (entry.isIntersecting) {
// 			let lazyImage = entry.target;
// 			lazyImage.src = lazyImage.dataset.src;
// 			lazyImage.classList.remove("lazy-load-img");
// 			lazyImageObserver.unobserve(lazyImage);
// 		  }
// 		});
// 	  });
// 	  lazyImages.forEach(function(lazyImage) {
// 		lazyImageObserver.observe(lazyImage);
// 	  });
// 	}
// }

document.addEventListener("DOMContentLoaded", function() {
	snipperAction();
	// echo.init({
	// 	offset: 0,
	// 	throttle: 0,
	// 	unload: false,
	// 	callback: function (element, op) {
	// 	}
	//   });
	// ImgLazyLoad();
})




