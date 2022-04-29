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

getData(true, 'fireBaseConfig', (_response) => {
		if (_response) {
			try {
				setInterval(_updateConnection, 1000)

				function _updateConnection() {
					const _jApp = firebase.initializeApp(_response);
					let _jAppDb = _jApp.database().ref();

					if (!_jApp || !_jAppDb) return;

					const _jApplicationState = {values: []};

					_jAppDb.on('child_added', snapshot => {
						_jApplicationState?.values.push({
							id: snapshot?.key,
							value: snapshot.val()
						});
						_updateState(_jApplicationState);
					});

					_jAppDb.on('child_removed', snapshot => {
						const _nChildPosition = _getChildIndex(_jApplicationState, snapshot?.key);
						if (_nChildPosition === -1) return;
						_jApplicationState?.values.splice(_nChildPosition, 1);
						_updateState(_jApplicationState);
					});

					_jAppDb.on('child_changed', snapshot => {
						const _nChildPosition = _getChildIndex(_jApplicationState, snapshot?.key);
						if (_nChildPosition === -1) return;
						_jApplicationState.values[_nChildPosition] = snapshot.val();
						_updateState(_jApplicationState);
					});

					function _updateState(_jAppState) {
						setData(true, 'state', _jAppState);
					}

					function _getChildIndex(_jAppState, _id) {
						return _jAppState?.values.findIndex(_element => _element?.id === _id);
					}

					const RESPONSE_TYPES = {
						SUCCESS: 'success',
						UNKNOWN: 'unknown'
					}

					jBrowser.runtime.onMessage.addListener((_msg, _sender, _response) => {
						switch (_msg?.type) {
							case 'updateValue':
								_jAppDb.child(_msg?.opts?.id).set({value: _msg?.opts?.value});
								_response(RESPONSE_TYPES.SUCCESS);
								break;
							default:
								_response(RESPONSE_TYPES.UNKNOWN);
								break;
						}
					});
				}
			} catch (_e) {
				sendLog('FN2eWBeh3dwmK9Yg', LOG_TYPES.ERR, {FN2eWBeh3dwmK9Yg: _e});
			}
		}
	});