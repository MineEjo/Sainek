const USER_LANG = (navigator.language || navigator.userLanguage).slice(0, 2);

const DEFAULT_CLASS = 'default-anime-keeper-4FLZQdEs';
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
		jBrowser = chrome;1
		if (!jBrowser) sendLog('err', 'E77yp5MeRjT2qQTG', 'index.js', {E77yp5MeRjT2qQTG: _e});
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
		sendLog('err', 'N22KhK6A8XqQg7tz', 'index.js', {N22KhK6A8XqQg7tz: _e});
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
		sendLog('err', 'a922GPKTcNuw87wn', 'index.js', {a922GPKTcNuw87wn: _e});
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
		sendLog('err', 'BUZPcn3XnLj8aDrD', 'index.js', {BUZPcn3XnLj8aDrD: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function getLocalUrl(_sUrl) {
	try {
		return (_sUrl) ? jBrowser?.extension?.getURL(_sUrl) : undefined;
	} catch (_e) {
		sendLog('err', 'eLq6MAy44bXkXD9T', 'index.js', {eLq6MAy44bXkXD9T: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function getLocale(key) {
	try {
		return (key) ? (eval(`BOARD_${USER_LANG.toUpperCase()}`))[key] : undefined;
	} catch (_e) {
		sendLog('err', 'g5EtG3F98MG6zquX', 'index.js', {g5EtG3F98MG6zquX: _e});
		if (!bDebugMode) window?.location?.reload();
	}
}

function setDebugMode(_bState) {
	if (_bState) bDebugMode = _bState;
}

function sendLog(_nType, _sId, _sFile, _sLog) {
	if (bDebugMode) {
		console.table({
			LOG: _sLog,
			ID: _sId,
			FILE: _sFile,
			TYPE: _nType.toUpperCase()
		});
	}
}