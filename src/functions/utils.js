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

function getDeclension(_nValue, _aDeclensions) {
	let number = Math.abs(_nValue) % 100;
	if (number > 10 && number < 20) {
		return _aDeclensions[2];
	}
	number = number % 10;
	if (number > 1 && number < 5) {
		return _aDeclensions[1];
	}
	if (number === 1) {
		return _aDeclensions[0];
	}
	return _aDeclensions[2];
}

function getFormattedDate(_Date) {
	const _dDate = new Date(_Date);
	/* One is added because the count from zero, which makes the months 11 instead of 12 */
	return `${getLocale('weekdays[' + _dDate.getDay() + ']')}, ${_dDate.getDate()} ` +
		`${getLocale('yearMonths[' + _dDate.getMonth() + ']')} ${_dDate.getFullYear()} ${getLocale('yearR')}., ` +
		`${_addNull(_dDate.getHours())}:${_addNull(_dDate.getMinutes())}`;
	
	function _addNull(_value) {
		if (_value) {
			_value = _value.toString();
			if (_value.length === 1) {
				return '0' + _value;
			} else {
				return _value;
			}
		}
	}
}

let bDebugMode = false;

function setDebugMode(_bState) {
	if (_bState) {
		console.time('debug [time]');
		bDebugMode = _bState;
	}
}

function consoleSend(_nType, _sLog) {
	if (bDebugMode) {
		console.time('answer [time]');
		const _sId = `sainek [gebug] [${_nType}]: ${_sLog}`;
		if (_nType === CONSOLE.ERROR || _nType === CONSOLE.WARN) {
			console.group(_sId);
		} else {
			console.groupCollapsed(_sId);
		}
		console[_nType](_sLog);
		console.trace('debug [trace]');
		console.timeEnd('answer [time]');
		console.timeLog('debug [time]');
		console.groupEnd();
	}
}

let jBrowser = updateBrowser();

function updateBrowser() {
	try {
		return browser;
	} catch (_e) {
		try {
			return chrome;
		} catch (_e) {
			if (!bDebugMode) consoleSend(CONSOLE.ERROR, _e);
		}
	}
}

/* function getURLResource(_sUrl) {
 *	try {
 *		return (_sUrl) ? jBrowser?.extension?.getURL(_sUrl) : undefined;
 *	} catch (_e) {
 *		consoleSend(CONSOLE.ERROR, _e);
 *		if (!bDebugMode) window?.location?.reload();
 *	}
 }*/

function getLocale(_string) {
	let _sOriginal = _string;
	
	/* Json key is specified as: "==key==" */
	let _aVars = _string.match(/==[a-zA-Z]*==/gi);
	
	if (_aVars) {
		for (let _sVar of _aVars) {
			/* Removing variable designation */
			let _key = _sVar.replace('==', '').replace('==', '');
			
			/* Replacing a variable in the text with the response */
			_sOriginal = _sOriginal.replace(_sVar, _getResponse(_key));
		}
		
		return _sOriginal;
	} else {
		/* To simplify the task and not always require equality, the function can get the json key directly */
		return _sOriginal.replace(_string, _getResponse(_string));
	}
	
	function _getResponse(_string) {
		try {
			/*If the key points to a json array: "keys[0]" */
			if (_string.includes('[') && _string.includes(']')) {
				const _nIndex = _string.slice(_string.indexOf('[') + 1, _string.indexOf(']'));
				_string = _string.replace(`[${_nIndex}]`, '');
				return (eval(`WEBSITE_${sUserLang.toUpperCase()}`))[_string][_nIndex] || _string;
			} else {
				return (eval(`WEBSITE_${sUserLang.toUpperCase()}`))[_string] || _string;
			}
		} catch (_e) {
			consoleSend(CONSOLE.ERROR, _e);
			if (!bDebugMode) window?.location?.reload();
		}
	}
}

function setData(_bLocal, _sId, _sValue, _fFunction) {
	const _nMaxAttempts = 50;
	
	try {
		jBrowser?.storage?.local?.get('fireBaseConfig', (_response) => {
			if (_bLocal || !_response.fireBaseConfig) {
				jBrowser.storage.local.set({[_sId]: _sValue});
				if (_fFunction) _fFunction();
			} else {
				function _tryUpdate() {
					let _nAttempts = 0;
					
					jBrowser.runtime.sendMessage({
						type: 'update-value', opts: {
							id: _sId,
							value: _sValue
						}
					}, (_response) => {
						if (jBrowser.runtime.lastError) {
							if (_nAttempts <= _nMaxAttempts) {
								setTimeout(_tryUpdate, 500);
								_nAttempts++;
							} else {
								consoleSend(CONSOLE.ERROR, jBrowser.runtime.lastError);
							}
						} else if (_response === RESPONSE.SUCCESS && _fFunction) {
							_fFunction(_response);
						} else {
							consoleSend(CONSOLE.ERROR, _response);
						}
					});
				}
				
				_tryUpdate();
			}
		});
	} catch (_e) {
		consoleSend(CONSOLE.ERROR, _e);
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
				jBrowser?.storage?.local?.get(['firebase'], (_response) => {
					const _jData = _response?.firebase?.values;
					if (_fFunction) _fFunction(_jData[_jData.findIndex(_element => _element.id === _sId)]?.value?.value);
				});
			}
		});
	} catch (_e) {
		consoleSend(CONSOLE.ERROR, _e);
		if (!bDebugMode) window?.location?.reload();
	}
}

function setTheme(_nVariation) {
	/* For use in an array, undefined or NaN is replaced by 0 */
	if (!_nVariation) _nVariation = 0;
	
	/* Hint [_nVariation]: Theme number, corresponds to the color position in the array */
	const _Themes = new Map();
	_Themes.set('--theme-bg-NCgj6pqy', ['--white-color-3vbK5BDV', '--dark-color-vBPysD4T']);
	_Themes.set('--theme-color-vJjNcN5y', ['--dark-color-embed-m3xm2aNB', '--white-color-embed-HduJdL3S']);
	_Themes.set('--theme-bg-embed-Qb8Sk8Lx', ['--white-color-embed-HduJdL3S', '--dark-color-embed-m3xm2aNB']);
	_Themes.set('--theme-embed-WqJ5wmN7', ['--white-embed-DjTCY6SZ', '--dark-embed-4u4AfxRU']);
	
	if (_nVariation > -1) {
		const _aProperties = [];
		
		/* Key enumeration, to be obtained in the future */
		for (const _sKey of _Themes.keys()) _aProperties.push(_sKey);
		
		for (const _sProperty of _aProperties) {
			/* Variable in the root, the color is set */
			document.documentElement.style.setProperty(_sProperty, `var(${_Themes.get(_sProperty)[_nVariation]})`);
		}
	}
	
	/* Colors have several hues and do not depend on the theme */
	let _aColorsProperties = [
		'--theme-main-HhBN5WbS', '--theme-main-embed-4jENYFdP', '--theme-main-volume-78575Cne'
	];
	let _aColors = ['--pink-color-rVwK3Nh4', '--pink-embed-color-Zb7vgZhX', '--pink-volume-color-z3tLWNz7'];
	
	/* Secondary colors */
	_aColorsProperties = _aColorsProperties.concat([
		'--theme-secondary-vjCW8zjK', '--theme-secondary-embed-tjzYs989', '--theme-secondary-volume-A7wb7LuP'
	]);
	_aColors = _aColors.concat([
		'--blue-color-TthRYu9u', '--blue-embed-color-JAC9gVzw', '--blue-volume-color-6BF3mc67'
	]);
	
	/* Important colors */
	_aColorsProperties = _aColorsProperties.concat([
		'--theme-important-e3k8RWPr', '--theme-important-embed-J8HMXFgv', '--theme-important-volume-k67xZ9xy'
	]);
	_aColors = _aColors.concat([
		'--red-color-6DYMf3eb', '--red-embed-color-PJr3zT9Q', '--red-volume-color-eXu6DzyN'
	]);
	
	/* Other colors */
	_aColorsProperties = _aColorsProperties.concat([
		'--theme-other-X37CckTe', '--theme-other-embed-vt65bdLQ', '--theme-other-volume-XNL8mWcz'
	]);
	_aColors = _aColors.concat(['--white-color-3vbK5BDV', '--gray-color-re9uPfVP', '--shadow-color-fAN8C5jL']);
	
	if (_aColorsProperties.length !== _aColors.length) {
		return consoleSend(CONSOLE.ERROR, 'Matching error: missing property or color');
	}
	
	for (let _nIndex = 0; _nIndex < _aColorsProperties.length; _nIndex++) {
		/* Variable in the root, the color is set */
		document.documentElement.style.setProperty(_aColorsProperties[_nIndex], `var(${_aColors[_nIndex]})`);
	}
}

function setAttachBoard(_bState) {
	if (_bState) {
		document.body.classList.add('default-attached-da5aKFrB');
		if (hBoard) hBoard.classList.add('attached-P6vcTXH4');
	} else {
		document.body.classList.remove('default-attached-da5aKFrB');
		if (hBoard) hBoard.classList.remove('attached-P6vcTXH4');
	}
}

/* The extension can be deleted, etc., to avoid errors, there is this listener */
function addContextListener(_hElement) {
	_hElement.addEventListener('mouseenter', () => {
		if (!jBrowser?.runtime?.id) {
			const _bResult = confirm(getLocale('oldSessionAlert'));
			
			if (_bResult) {
				window.location.reload();
			} else {
				removeElement(null, 'removed-Uyh8hDaC', _hElement);
				setAttachBoard(false);
			}
		}
	});
}

const observer = new IntersectionObserver((_entries, _observer) => {
	_entries.forEach((_entry) => {
		if (!_entry.isIntersecting) {
			return;
		}
		_entry.target.classList.add('lazy-load-5BkUVwbJ');
		_observer.unobserve(_entry.target);
	});
}, {
	threshold: 0.7
});
