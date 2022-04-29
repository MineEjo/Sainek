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
 * along with JJkBot.  If not, see <http://www.gnu.org/licenses/>.
 */

const USER_LANG = (navigator.language || navigator.userLanguage).slice(0, 2);

const DEFAULT_CLASS = 'default-4FLZQdEs';
const SHORTCUT_CLASS = 'shortcut-keeper-V7J89asy';
const LANG_CODES = new Map();
LANG_CODES.set('ru', 'Аниме');
LANG_CODES.set('en', 'Anime');

let bDebugMode = false;
let bExtensionEnabled = false;
let jBrowser = null;

updateBrowser();
updateEnable();

function updateBrowser() {
	try {
		jBrowser = browser || chrome;
	} catch (_e) {
		jBrowser = chrome;
		if (!jBrowser) sendLog('E77yp5MeRjT2qQTG', LOG_TYPES.ERR, {E77yp5MeRjT2qQTG: _e});
	}
}

function updateEnable() {
	try {
		getData(false, 'blackList', (_response) => {
			if (_response && _response.includes(document.URL)) {
				bExtensionEnabled = false;
			}
			else if (window.find(LANG_CODES.get(document.documentElement.lang))) {
				bExtensionEnabled = true;
				updateElements();
			}
		})
	} catch (_e) {
		sendLog('N22KhK6A8XqQg7tz', LOG_TYPES.ERR, {N22KhK6A8XqQg7tz: _e});
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
		sendLog('a922GPKTcNuw87wn', LOG_TYPES.ERR, {a922GPKTcNuw87wn: _e});
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
		sendLog('BUZPcn3XnLj8aDrD', LOG_TYPES.ERR, {BUZPcn3XnLj8aDrD: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function getLocalUrl(_sUrl) {
	try {
		return (_sUrl) ? jBrowser?.extension?.getURL(_sUrl) : undefined;
	} catch (_e) {
		sendLog('eLq6MAy44bXkXD9T', LOG_TYPES.ERR, {eLq6MAy44bXkXD9T: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function getLocale(key) {
	try {
		return (key) ? (eval(`BOARD_${USER_LANG.toUpperCase()}`))[key] : undefined;
	} catch (_e) {
		sendLog('g5EtG3F98MG6zquX', LOG_TYPES.ERR, {g5EtG3F98MG6zquX: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function setDebugMode(_bState) {
	if (_bState) bDebugMode = _bState;
}

const LOG_TYPES = {
	LOG: 'log',
	ERR: 'error'
}

function sendLog(_sId, _nType, _sLog) {
	if (bDebugMode) console[_nType]({ID: _sId, LOG: _sLog,});
}