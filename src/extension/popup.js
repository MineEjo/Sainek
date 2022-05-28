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

/* Loading elements */
getData(true, 'debugMode', (_response) => {
	const _hElement = document.getElementById('debugMode');
	if (_hElement && _response) _hElement.checked = _response;
});

getData(true, 'extensionTheme', (_response) => {
	/* A theme system may be added in the future, so instead of the appropriate "true" and "false", "2", the non-default theme number, means "true". */
	const _hElement = document.getElementById('extensionTheme');
	
	if (_hElement) {
		setTheme(_response);
		_hElement.checked = (_response === 1);
	}
});

getData(true, 'boardAttached', (_response) => {
	const _hElement = document.getElementById('boardAttached');
	if (_hElement && _response) _hElement.checked = _response;
});

getData(true, 'boardDisable', (_response) => {
	const _hElement = document.getElementById('boardDisable');
	if (_hElement && _response) _hElement.checked = _response;
});

getData(false, 'blackList', (_response) => {
	const _hBlackList = document.getElementById('blackList');
	if (_hBlackList && _response) _hBlackList.value = _response;
});

getData(true, 'firebaseConfig', (_response) => {
	const _hFirebaseConfig = document.getElementById('firebaseConfig');
	if (_hFirebaseConfig && _response) _hFirebaseConfig.value = JSON.stringify(_response);
});

/* Formatting and blacklisting links */
const hBlackList = document.getElementById('blackList');
hBlackList.addEventListener('input', (_hEvent) => {
	let _sValue = _hEvent?.target?.value;
	const _aLinks = _sValue.match(/(((https?:\/\/)|(www\.))[^\s]+)/g);
	
	let _sFormatted = '';
	if (_aLinks) {
		for (const _sLink of _aLinks) {
			_sFormatted += `${_sLink}\n`;
			_sValue = _sValue.replace(_sLink, '').replace('\n', '');
		}
	}
	
	setChange();
	_hEvent.target.value = _sFormatted + _sValue;
	setData(false, 'blackList', _sFormatted);
});

/* Formatting and writing config for Firebase */
const hFirebaseConfig = document.getElementById('firebaseConfig');
hFirebaseConfig.addEventListener('input', (_hEvent) => {
	const _sValue = _hEvent.target.value.toString();
	let _sJson = '';
	
	try {
		/* The code is designed for the user to copy the ready-made config from the Firebase settings. */
		if (_sValue?.length > 50) {
			let _sTemp = (_sValue.slice(_sValue.indexOf('{'), _sValue.indexOf('}')).trim() + '\n}').replace(/: /gm, '": ').replace(/  /gm, '"');
			_sJson = JSON.parse(_sTemp);
		}
	} catch (e) {
		return (_sValue.length > 50) ? alert(e) : null;
	}
	
	_hEvent.target.value = JSON.stringify(_sJson);
	setData(true, 'firebaseConfig', _sJson);
	alert(_getLocale('alertReloadExtension'));
});

/* Actions after clicking on the checkbox */
document.addEventListener('click', _hEvent => {
	if (_hEvent?.target?.id) {
		const _Functions = new Map();
		
		_Functions.set('debugMode', (_sId, _sValue) => {
			setData(true, _sId, _sValue);
			setDebugMode(true);
		});
		
		_Functions.set('extensionTheme', (_sId, _sValue) => {
			setTheme((_sValue) ? 1 : 0);
			setData(true, _sId, (_sValue) ? 1 : 0);
		});
		
		_Functions.set('boardAttached', (_sId, _sValue) => {
			setData(true, _sId, _sValue);
		});
		
		_Functions.set('boardDisable', (_sId, _sValue) => {
			setData(true, _sId, _sValue);
		});
		
		const _hElement = document.getElementById(_hEvent?.target?.id);
		
		if (_hElement.tagName && _hElement.tagName === 'INPUT') {
			if (_Functions.has(_hElement?.id)) {
				_Functions.get(_hElement?.id)(_hElement?.id, _hElement.checked);
				
				setChange();
			}
		}
	}
});

const Lang = new Map();
Lang.set('en', POPUP_EN);
Lang.set('ru', POPUP_RU);
Lang.set(0, POPUP);

/* Load links */
for (const _hElement of document.getElementsByClassName('link')) {
	_hElement.setAttribute('href', (Lang.get(0))[_hElement.getAttribute('link')]);
}

/* Load locale */
if (Lang.has(sUserLang)) {
	const LOCALE = Lang.get(sUserLang);
	
	for (const _hElement of document.getElementsByClassName('locale')) {
		_hElement.innerHTML = LOCALE[_hElement.innerHTML];
	}
	
	function _getLocale(_sKey) {
		return LOCALE[_sKey];
	}
}
