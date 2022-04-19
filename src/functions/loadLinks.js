for (const _hElement of document.getElementsByClassName('link')) {
	_hElement.setAttribute('href', (LANG.get(0))[_hElement.getAttribute('link')]);
}