/* Array with information about the anime on the page */
const Anime = new Map();

/* Most often such arrays are needed for a simple check if there is information on the page */
const aAnimeTitles = [];

function loadPageInfo() {
	const _sTitles = document.getElementsByTagName('h1');

	for (const _sTitle of _sTitles) {
		aAnimeTitles.push(_sTitle.innerText);
		_sTitle.classList.add(SHORTCUT_CLASS);

		!Anime.has(_sTitle) && Anime.set('0', {
			'title': _sTitle.innerText,
			'object': _sTitle
		});
	}
}
