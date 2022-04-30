/*
 * Copyright (c) 2022 MineEjo.
 * This file is part of Sainek-Serials-Keeper <https://github.com/MineEjo/Sainek-Serials-Keeper>.
 *
 * Sainek-Serials-Keeper is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Sainek-Serials-Keeper is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with  Sainek-Serials-Keeper.  If not, see <http://www.gnu.org/licenses/>.
 */

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

function setAttachBoard(_bState) {
	if (_bState) {
		document.body.classList.add('default-attached-da5aKFrB');
		hBoard.classList.add('attached-P6vcTXH4');
	} else {
		document.body.classList.remove('default-attached-da5aKFrB');
		hBoard.classList.remove('attached-P6vcTXH4');
	}
}

function updateElements() {
	if (bExtensionEnabled) {
		removeClassElements(DEFAULT_CLASS);

		loadPageInfo();
		loadStatuses();

		getData(true, 'boardDisable', (_response) => {
			if (!_response) {
				loadBoard();

				getData(true, 'boardAttached', (_response) => {
					setAttachBoard(_response);
				});
			}
		});

		getData(true, 'debugMode', (_response) => {
			setDebugMode(_response);
		});

		getData(true, 'extensionTheme', (_response) => {
			setTheme(false, _response);
		});
	}
}