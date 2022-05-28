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

getData(true, 'firebaseConfig', (_response) => {
	if (_response) {
		try {
			const _jApp = firebase.initializeApp(_response);
			let _jAppDb = _jApp.database().ref();
			
			if (!_jApp || !_jAppDb) return;
			
			const _jData = {values: []};
			
			_jAppDb.on('child_added', snapshot => {
				_jData?.values.push({
					id: snapshot?.key,
					value: snapshot.val()
				});
				_updateData(_jData);
			});
			
			_jAppDb.on('child_removed', snapshot => {
				const _nChildPosition = _getChildIndex(_jData, snapshot?.key);
				if (_nChildPosition === -1) return;
				_jData?.values.splice(_nChildPosition, 1);
				_updateData(_jData);
			});
			
			_jAppDb.on('child_changed', snapshot => {
				const _nChildPosition = _getChildIndex(_jData, snapshot?.key);
				if (_nChildPosition === -1) return;
				_jData.values[_nChildPosition] = {
					id: snapshot?.key,
					value: snapshot?.val()
				};
				_updateData(_jData);
			});
			
			jBrowser.runtime.onMessage.addListener((_msg, _sender, _sendResponse) => {
				switch (_msg?.type) {
				case 'update-value':
					_jAppDb.child(_msg?.opts?.id).set({value: _msg?.opts?.value});
					_sendResponse(RESPONSE.SUCCESS);
					break;
				default:
					_sendResponse(RESPONSE.UNKNOWN);
					break;
				}
			});
			
			function _updateData(_jData) {
				setData(true, 'firebase', _jData);
			}
			
			function _getChildIndex(_jData, _id) {
				return _jData?.values.findIndex(_element => _element?.id === _id);
			}
		} catch (_e) {
			consoleSend(CONSOLE.ERROR, _e);
		}
	}
});
