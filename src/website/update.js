function setTheme(_hElement, _nVariation) {
	const _Styles = new Map();
	_Styles.set('LABEL', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);
	_Styles.set('INPUT', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);
	_Styles.set('TEXTAREA', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);
	_Styles.set('LI', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);
	_Styles.set('UL', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);

	_Styles.set('DIV', ['background', 'var(--white-color-3vbK5BDV)', 'var(--dark-color-vBPysD4T)']);
	_Styles.set('UL', ['background', 'var(--white-color-3vbK5BDV)', 'var(--dark-color-vBPysD4T)']);

	if (_nVariation) {
		for (const _hElement of document.getElementsByClassName(DEFAULT_CLASS)) {
			if (_hElement && _Styles.has(_hElement.tagName)) {
				if (_hElement.style.backgroundImage) continue;
				if (_hElement.style.background && _hElement.style.background === 'var(--neutral-embed-color-4PQYryMp)') continue;
				if (_hElement.style.color && _hElement.style.color === 'var(--neutral-color-TmH5QR3n)') continue;
				_setStyle(_hElement, _nVariation);
			}
		}
	}

	if (_hElement) {
		getData(true, 'extensionTheme', (_response) => {
			if (!_hElement.style.backgroundImage) {
				_setStyle(_hElement, (_response) ? _response : 1);
			}
		});
	}

	function _setStyle(_hElement, _nNumber) {
		if (_hElement && _Styles.has(_hElement.tagName)) _hElement.style[_Styles.get(_hElement.tagName)[0]] = _Styles.get(_hElement.tagName)[_nNumber];
	}
}

function setVisibleBoard(_bState) {
	if (_bState) {
		hBoard.classList.remove('hidden-3fUMW2Dg');
		hBoard.classList.add('visible-YGUz5VCS');
	} else {
		hBoard.classList.add('hidden-3fUMW2Dg');
		hBoard.classList.remove('visible-YGUz5VCS');
	}
}

function setAttachBoard(_bState) {
	if (_bState && hBoard.classList.contains('visible-YGUz5VCS')) {
		document.body.classList.add('default-anime-keeper-attached-da5aKFrB');
		hBoard.classList.add('attached-P6vcTXH4');
	} else {
		document.body.classList.remove('default-anime-keeper-attached-da5aKFrB');
		hBoard.classList.remove('attached-P6vcTXH4');
	}
}

function updateElements() {
if (bExtensionEnabled) {
		removeClassElements(DEFAULT_CLASS);

		loadPageInfo();
		loadAnimeStatuses();

		getData(true, 'boardDisable', (_response) => {
			if (!_response) loadAnimeBoard();
		});

		getData(true, 'debugMode', (_response) => {
			setDebugMode(_response);
		});

		getData(true, 'boardVisibled', (_response) => {
			setVisibleBoard(_response);
		});

		getData(true, 'boardAttached', (_response) => {
			setAttachBoard(_response);
		});

		getData(true, 'extensionTheme', (_response) => {
			setTheme(false, _response);
		});
	}
}