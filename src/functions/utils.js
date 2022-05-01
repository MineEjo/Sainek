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

const sUserLang = (navigator.language || navigator.userLanguage).slice(0, 2);

function genId() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function capitalizeFirstLetter(_sString) {
	return _sString.charAt(0).toUpperCase() + _sString.slice(1);
}

let bDebugMode = false;
function setDebugMode(_bState) {
	if (_bState) bDebugMode = _bState;
}

function consoleSend(_sId, _nType, _sLog) {
	if (bDebugMode) console[_nType]({ID: _sId, LOG: _sLog,});
}

let jBrowser = updateBrowser();

function updateBrowser() {
	try {
		return browser;
	} catch (_e) {
		try {
		return chrome;
		} catch (_e) {
			if (!bDebugMode) consoleSend('E77yp5MeRjT2qQTG', CONSOLE.ERR, {E77yp5MeRjT2qQTG: _e});
		}
	}
}

function getURLResource(_sUrl) {
	try {
		return (_sUrl) ? jBrowser?.extension?.getURL(_sUrl) : undefined;
	} catch (_e) {
		consoleSend('eLq6MAy44bXkXD9T', CONSOLE.ERR, {eLq6MAy44bXkXD9T: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function getLocale(key) {
	try {
		return (key) ? (eval(`BOARD_${sUserLang.toUpperCase()}`))[key] : undefined;
	} catch (_e) {
		consoleSend('g5EtG3F98MG6zquX', CONSOLE.ERR, {g5EtG3F98MG6zquX: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function setData(_bLocal, _sId, _sValue, _fFunction) {
	try {
		jBrowser?.storage?.local?.get('fireBaseConfig', (_response) => {
			if (_bLocal || !_response.fireBaseConfig) {
				jBrowser.storage.local.set({[_sId]: _sValue});
				if (_fFunction) _fFunction();
			} else {
				jBrowser.runtime.sendMessage({
					type: 'updateValue', opts: {
						id: _sId,
						value: _sValue
					}
				}, (_response) => {
					if (_fFunction) _fFunction(_response);
				});
			}
		});
	} catch (_e) {
		consoleSend('a922GPKTcNuw87wn', CONSOLE.ERR, {a922GPKTcNuw87wn: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function getData(_bLocal, _sId, _fFunction) {
	try {
		jBrowser?.storage?.local?.get('fireBaseConfig', (_response) => {
			if (_bLocal || !_response.fireBaseConfig) {
				jBrowser?.storage?.local?.get([_sId], (_response) => {
					if (_fFunction) _fFunction(_response[_sId]);
				});
			} else {
				jBrowser?.storage?.local?.get(['state'], (_response) => {
					const _jApplicationState = _response?.state?.values;
					if (_fFunction) _fFunction(_jApplicationState[_jApplicationState.findIndex(_element => _element.id === _sId)]?.value?.value);
				});
			}
		});
	} catch (_e) {
		consoleSend('BUZPcn3XnLj8aDrD', CONSOLE.ERR, {BUZPcn3XnLj8aDrD: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function setTheme(_hElement, _nVariation) {
	const _Styles = new Map();
	_Styles.set('LABEL', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);
	_Styles.set('INPUT', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);
	_Styles.set('TEXTAREA', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);
	_Styles.set('LI', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);
	_Styles.set('UL', ['color', 'var(--black-color-zzK58DLM)', 'var(--light-color-t5kEDH3d)']);

	_Styles.set('DIV', ['background', 'var(--white-color-3vbK5BDV)', 'var(--dark-color-vBPysD4T)']);
	_Styles.set('UL', ['background', 'var(--white-color-3vbK5BDV)', 'var(--dark-color-vBPysD4T)']);

	_Styles.set('THEME_BG', ['null', 'var(--white-color-3vbK5BDV)', 'var(--dark-color-vBPysD4T)']);

	if (_nVariation) {
		for (const _hElement of document.getElementsByClassName(CSS.CLASS.DEFAULT)) {
			if (_hElement && _Styles.has(_hElement.tagName)) {
				if (_hElement.style.backgroundImage) continue;
				if (_hElement.style.background && _hElement.style.background === 'var(--neutral-embed-color-4PQYryMp)') continue;
				if (_hElement.style.color && _hElement.style.color === 'var(--neutral-color-TmH5QR3n)') continue;
				_setStyle(_hElement, _nVariation);
			}
		}

		document.documentElement.style.setProperty('--theme-bg-color-NCgj6pqy', _Styles.get('THEME_BG')[_nVariation]);
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