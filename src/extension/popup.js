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

getData(true, 'debugMode', (_response) => {
	const _hElement = document.getElementById('debugMode');
	if (_hElement && _response) _hElement.checked = _response;
});

getData(true, 'extensionTheme', (_response) => {
	/* A theme system may be added in the future, so instead of the appropriate "true" and "false", "2", the non-default theme number, means "true". */
	const _hElement = document.getElementById('extensionTheme');

	if (_hElement && _response) {
		setTheme(false, _response);
		_hElement.checked = (_response === 2);
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
	const _hFireBaseConfig = document.getElementById('blackList');
	if (_hFireBaseConfig && _response) _hFireBaseConfig.value = _response;
});

getData(true, 'fireBaseConfig', (_response) => {
	const _hFireBaseConfig = document.getElementById('fireBaseConfig');
	if (_hFireBaseConfig && _response) _hFireBaseConfig.value = JSON.stringify(_response);
});

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

	_hEvent.target.value = _sFormatted + _sValue;
	setData(false, 'blackList', _sFormatted);
});

const hFireBaseConfig = document.getElementById('fireBaseConfig');
hFireBaseConfig.addEventListener('input', (_hEvent) => {
	const _sValue = _hEvent.target.value.toString();
	let _sJson = '';

	try {
		/* The code is designed for the user to copy the ready-made config from the FireBase settings. */
		if (_sValue?.length > 50) {
			let _sTemp = (_sValue.slice(_sValue.indexOf('{'), _sValue.indexOf('}')).trim() + '\n}')
			.replace(/: /gm, '": ')
			.replace(/  /gm, '"');
			_sJson = JSON.parse(_sTemp);
		}
	} catch (e) {
		return (_sValue.length > 50) ? alert(e) : null;
	}

	_hEvent.target.value = JSON.stringify(_sJson);
	setData(true, 'fireBaseConfig', _sJson);
	alert(_getLocale('alertReloadExtension'))
});

document.addEventListener('click', _hEvent => {
	if (_hEvent?.target?.id) {
		const _Functions = new Map();

		_Functions.set('debugMode', (_sId, _sValue) => {
			setData(true, _sId, _sValue);
			setDebugMode(true);
		});

		_Functions.set('extensionTheme', (_sId, _sValue) => {
			setTheme(false, (_sValue) ? 2 : 1);
			setData(true, _sId, (_sValue) ? 2 : 1);
		});

		_Functions.set('boardAttached', (_sId, _sValue) => {
			setData(true, _sId, _sValue);
		});

		_Functions.set('boardDisable', (_sId, _sValue) => {
			setData(true, _sId, _sValue);
		});

		const _hElement = document.getElementById(_hEvent?.target?.id);

		if (_hElement.tagName && _hElement.tagName === 'INPUT') {
			if (_Functions.has(_hElement?.id)) _Functions.get(_hElement?.id)(_hElement?.id, _hElement.checked);
		}
	}
});