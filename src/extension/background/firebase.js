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

					jBrowser.runtime.onMessage.addListener((_msg, _sender, _response) => {
						switch (_msg?.type) {
							case 'updateValue':
								_jAppDb.child(_msg?.opts?.id).set({value: _msg?.opts?.value});
								_response('success');
								break;
							default:
								_response('unknown request');
								break;
						}
					});
				}
			} catch (_e) {
				sendLog(LOG_TYPES.ERR, 'FN2eWBeh3dwmK9Yg', 'index.js', {FN2eWBeh3dwmK9Yg: _e});
			}
		}
	});