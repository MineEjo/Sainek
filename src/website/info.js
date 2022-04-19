const Anime = new Map();

function loadPageInfo() {
	const _sTitles = document.getElementsByTagName('h1');

	for (const _sTitle of _sTitles) {
		!Anime.has(_sTitle) && Anime.set('0', {
			'title': _sTitle.innerText,
			'object': _sTitle
		});
	}
}
