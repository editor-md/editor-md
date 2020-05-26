
function Clipboard(loadPath) {

	var snippets = document.querySelectorAll('.snippet'); [].forEach.call(snippets,
	function(snippet) {
		var btnHTML = '<button class="snippet-copy-btn" data-clipboard-snippet>' +
		'<div class="snippet-clippy" >' +
		'<svg t="1590476536758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19774" width="15" height="15"><path d="M861.090909 295.563636c13.963636 0 23.272727-9.309091 23.272727-23.272727V181.527273C884.363636 121.018182 835.490909 69.818182 772.654545 69.818182H251.345455C188.509091 69.818182 139.636364 121.018182 139.636364 181.527273v660.945454c0 60.509091 48.872727 111.709091 111.709091 111.709091h370.036363c6.981818 0 11.636364-2.327273 16.290909-6.981818l239.709091-242.036364c4.654545-4.654545 6.981818-9.309091 6.981818-16.290909V414.254545c0-13.963636-9.309091-23.272727-23.272727-23.272727s-23.272727 9.309091-23.272727 23.272727v251.345455h-216.436364c-13.963636 0-23.272727 9.309091-23.272727 23.272727V907.636364H251.345455C214.109091 907.636364 186.181818 877.381818 186.181818 842.472727V181.527273C186.181818 146.618182 214.109091 116.363636 251.345455 116.363636h523.636363C809.890909 116.363636 837.818182 146.618182 837.818182 181.527273v90.763636c0 13.963636 9.309091 23.272727 23.272727 23.272727z m-55.854545 416.581819l-160.581819 162.90909v-162.90909h160.581819z" fill="#2c2c2c" p-id="19775"></path><path d="M756.363636 230.4H269.963636c-13.963636 0-23.272727 9.309091-23.272727 23.272727s9.309091 23.272727 23.272727 23.272728h486.4c13.963636 0 23.272727-9.309091 23.272728-23.272728s-11.636364-23.272727-23.272728-23.272727zM779.636364 386.327273c0-13.963636-9.309091-23.272727-23.272728-23.272728H269.963636c-13.963636 0-23.272727 9.309091-23.272727 23.272728s9.309091 23.272727 23.272727 23.272727h486.4c11.636364 0 23.272727-11.636364 23.272728-23.272727zM269.963636 493.381818c-13.963636 0-23.272727 9.309091-23.272727 23.272727s9.309091 23.272727 23.272727 23.272728h262.981819c13.963636 0 23.272727-9.309091 23.272727-23.272728s-9.309091-23.272727-23.272727-23.272727H269.963636z" fill="#2c2c2c" p-id="19776"></path></svg>' +
		'</div>' +
		 '</button>';
		snippet.firstChild.insertAdjacentHTML('beforebegin', btnHTML);
	});

	snipperAction();
}

function snipperAction() {
	var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]', {
		target: function(trigger) {
			return trigger.nextElementSibling;
		}
	});
	
	clipboardSnippets.on('success',
	function(e) {
		e.clearSelection();
		showTooltip(e.trigger, '已复制');
	});
	
	clipboardSnippets.on('error',
	function(e) {
		showTooltip(e.trigger, fallbackMessage(e.action));
	});
	
	var btns = document.querySelectorAll('.snippet-copy-btn');
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener('mouseleave', clearTooltip);
		btns[i].addEventListener('blur', clearTooltip);
	}
	
	function clearTooltip(e) {
		e.currentTarget.setAttribute('class', 'snippet-copy-btn');
		e.currentTarget.removeAttribute('aria-label');
	}
	
	function showTooltip(elem, msg) {
		elem.setAttribute('class', 'snippet-copy-btn tooltipped tooltipped-s');
		elem.setAttribute('aria-label', msg);
	}
	
	function fallbackMessage(action) {
		var actionMsg = '';
		var actionKey = (action === 'cut' ? 'X': 'C');
		if (/iPhone|iPad/i.test(navigator.userAgent)) {
			actionMsg = 'No support :(';
		} else if (/Mac/i.test(navigator.userAgent)) {
			actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
		} else {
			actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
		}
		return actionMsg;
	}
}
