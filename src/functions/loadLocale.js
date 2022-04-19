if (LANG.has(USER_LANG)) {
	const LOCALE = LANG.get(USER_LANG);

	for (const _hElement of document.getElementsByClassName('locale')) {
		_hElement.innerHTML = LOCALE[_hElement.innerHTML];
	}

	function _getLocale(_sKey) {
		return LOCALE[_sKey]
	}
}