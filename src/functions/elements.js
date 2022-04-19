function createDiv(_hParent, _sId, _sClass, _fFunction) {
	const _hChild = document.createElement('div');
	_hChild.tabIndex = 1;

	if (_sId) _hChild.id = _sId;
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hChild));
	if (_hParent) _hParent.append(_hChild);

	setTheme(_hChild);
	_hChild.classList.add(DEFAULT_CLASS);
	return _hChild;
}

function createDivImg(_hParent, _sId, _sClass, _sSrc, _fFunction) {
	const _hChild = document.createElement('div');
	_hChild.tabIndex = 1;
	_hChild.draggable = false;

	if (_sId) _hChild.id = _sId;
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hChild));
	if (_sSrc) _hChild.style.backgroundImage = `url(${getLocalUrl(_sSrc)})`;
	if (_hParent) _hParent.append(_hChild);

	_hChild.classList.add(DEFAULT_CLASS, 'button-image-w3UhF6k8');
	return _hChild;
}

function createLabel(_hParent, _sId, _sClass, _sText, _sFor, _fFunction) {
	const _hChild = document.createElement('label');
	_hChild.tabIndex = 1;

	if (_sId) _hChild.id = _sId;
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hChild));
	if (_sText) _hChild.innerText = getLocale(_sText) || _sText;
	if (_hParent) _hParent.append(_hChild);

	setTheme(_hChild);
	_hChild.classList.add(DEFAULT_CLASS);
	return _hChild;
}

function createLink(_hParent, _sId, _sClass, _sText, _sHref, _sFor, _fFunction) {
	const _hChild = document.createElement('a');
	_hChild.tabIndex = 1;

	if (_sId) _hChild.id = _sId;
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hChild));
	if (_sText) _hChild.innerText = getLocale(_sText) || _sText;
	if (_sHref) _hChild.href = _sHref;
	if (_hParent) _hParent.append(_hChild);

	setTheme(_hChild);
	_hChild.classList.add(DEFAULT_CLASS);
	return _hChild;
}

function createInput(_hParent, _sId, _sClass, _sPlaceholder, _fFunction) {
	const _hChild = document.createElement('input');
	_hChild.tabIndex = 1;
	_hChild.type = 'text';

	if (_sId) _hChild.id = _sId;
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hChild));
	if (_sPlaceholder) _hChild.placeholder = getLocale(_sPlaceholder) || _sPlaceholder;
	if (_hParent) _hParent.append(_hChild);

	setTheme(_hChild);
	_hChild.classList.add(DEFAULT_CLASS);
	return _hChild;
}

function createTextarea(_hParent, _sId, _sClass, _sPlaceholder, _fFunction) {
	const _hChild = document.createElement('textarea');
	_hChild.tabIndex = 1;

	if (_sId) _hChild.id = _sId;
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hChild));
	if (_sPlaceholder) _hChild.placeholder = getLocale(_sPlaceholder) || _sPlaceholder;
	if (_hParent) _hParent.append(_hChild);

	setTheme(_hChild);
	_hChild.classList.add(DEFAULT_CLASS);
	return _hChild;
}

function createSelect(_hParent, _sId, _sClass, _sPlaceholder, _aOptions, _fFunction) {
	const _hChild = document.createElement('div');
	_hChild.tabIndex = 1;
	_hChild.setAttribute('value', '0');
	const _hLabel = document.createElement('label');
	_hLabel.style.color = 'var(--neutral-color-TmH5QR3n)';
	_hChild.append(_hLabel);
	createDivImg(_hChild, '', '', 'assets/small-down-arrow.svg');
	const _hSelect = document.createElement('ul');
	setTheme(_hSelect);
	_hChild.append(_hSelect);

	if (_sPlaceholder) _hLabel.innerText = getLocale(_sPlaceholder) || _sPlaceholder;
	if (_sId) _hChild.id = _sId;
	if (_aOptions) {
		for (const _aOption of _aOptions) {
			const _hLi = document.createElement('li');
			_hLi.classList.add(DEFAULT_CLASS);
			if (_aOption[0]) _hLi.innerText = getLocale(_aOption[0]);
			if (_aOption[1]) _hLi.setAttribute('value', _aOption[1]);
			_hLi.onclick = function () {
				_hLabel.innerText = getLocale(_aOption[0]);
				setTheme(_hLabel);
				_hChild.setAttribute('value', _aOption[1]);

				const _hElements = _hSelect.getElementsByClassName('active-5QkcU5D4');
				for (const _hElement of _hElements) {
					_hElement.classList.remove('active-5QkcU5D4');
				}

				_hLi.classList.add(DEFAULT_CLASS, 'active-5QkcU5D4');
				_hParent.focus();
			};
			_hSelect.append(_hLi);
		}

		for (const _hLi of _hSelect.getElementsByTagName('li')) {
			setTheme(_hLi);
		}
	}
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hSelect));
	if (_hParent) _hParent.append(_hChild);

	setTheme(_hChild);
	_hChild.classList.add(DEFAULT_CLASS, 'select-MZnDy3Dp');
	_hLabel.classList.add(DEFAULT_CLASS);
	_hSelect.classList.add(DEFAULT_CLASS);
	return _hChild;
}

function select(_hParent, _sValue) {
	const _hLi = _hParent.getElementsByTagName('li')[parseInt(_sValue) - 1];
	const _hLabel = _hParent.getElementsByTagName('label')[0];
	_hParent.setAttribute('value', _sValue);
	_hLabel.innerText = _hLi.innerText;
	setTheme(_hLabel);
	_hLi.classList.add(DEFAULT_CLASS, 'active-5QkcU5D4');
}

function createSelectRating(_hParent, _sId, _sClass, _fFunction) {
	const _hChild = document.createElement('div');
	_hChild.tabIndex = 1;
	_hChild.setAttribute('value', '0');

	if (_sId) _hChild.id = _sId;
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hChild));
	if (_hParent) _hParent.append(_hChild);

	for (let _nStarts = 1; _nStarts <= 5; _nStarts++) {
		const _hSpan = document.createElement('span');
		_hSpan.classList.add('fa', 'fa-star');
		_hChild.append(_hSpan);

		_hSpan.onclick = function () {
			_hChild.setAttribute('value', _nStarts.toString());

			for (let _hStar = 0; _hStar < 5; _hStar++) {
				_hChild.getElementsByTagName('span')[_hStar].classList.remove('checked-cFXHwS3x');
			}

			for (let _hStar = 0; _hStar < _nStarts; _hStar++) {
				_hChild.getElementsByTagName('span')[_hStar].classList.add('fa', 'fa-star', 'checked-cFXHwS3x');
			}

			_hSpan.classList.add('fa', 'fa-star', 'checked-cFXHwS3x');
		};
	}

	setTheme(_hChild);
	_hChild.classList.add(DEFAULT_CLASS, 'select-rating-6VM6t2V5');
	return _hChild;
}

function selectRating(_hParent, _sRating) {
	_hParent.setAttribute('value', _sRating);

	for (let _hStar = 0; _hStar < parseInt(_sRating); _hStar++) {
		_hParent.getElementsByTagName('span')[_hStar].classList.add('fa', 'fa-star', 'checked-cFXHwS3x');
	}
}

function createButton(_hParent, _sId, _sClass, _sText, _fFunction) {
	const _hChild = document.createElement('button');
	_hChild.tabIndex = 1;

	if (_sId) _hChild.id = _sId;
	if (_sClass) addClassesElement(_hChild, _sClass);
	if (_fFunction) eval(_fFunction(_hChild));
	if (_sText) _hChild.innerText = getLocale(_sText) || _sText;
	if (_hParent) _hParent.append(_hChild);

	setTheme(_hChild);
	_hChild.classList.add(DEFAULT_CLASS);
	return _hChild;
}

function createMargin(_hParent, _nType, _sClass, _fFunction) {
	const _hChild = document.createElement('div');

	if (_hParent) _hParent.append(_hChild);
	_hChild.classList.add('margin-eu7ycpXr');

	switch (_nType) {
		case 'short':
			_hChild.style.paddingTop = 'var(--short-margin-xqv9MGJg)'
			break;
		case 'embed':
			_hChild.style.paddingTop = 'var(--embed-margin-xqv9MGJg)'
			break;
		default:
			_hChild.style.paddingTop = 'var(--default-margin-xqv9MGJg)'
			break;
	}

	if (_sClass) addClassesElement(_hChild, _sClass);

	_hChild.classList.add(DEFAULT_CLASS);
	return _hChild;
}

function removeClassElements(_sClass, _sClassAnimation) {
	const _hDefault = document.getElementsByClassName(DEFAULT_CLASS);

	if (_hDefault) {
		for (const _hElement of _hDefault) {
			const _hRemove = _hElement.getElementsByClassName(_sClass);

			if (_hRemove) {
				for (const _hElement of _hRemove) {
					if (_sClassAnimation) {
						_hElement.classList.add(_sClassAnimation);
						setTimeout(_removeElement, 500);
					} else {
						setTimeout(_removeElement, 0);
					}

					function _removeElement() {
						_hElement.remove();
					}
				}
			}
		}
	}
}

function removeElements(_sId, _sClassAnimation) {
	if (document.getElementsByClassName(DEFAULT_CLASS)) {
		const _hRemove = document.getElementById(_sId);
		if (_hRemove) {
			for (let _nIndex = 0; _nIndex < _hRemove.childElementCount; _nIndex++) {
				if (_sClassAnimation) {
					_hRemove.children.item(_nIndex).classList.add(_sClassAnimation);
					setTimeout(_removeElement, 500);
				} else {
					setTimeout(_removeElement, 0);
				}

				function _removeElement() {
					_hRemove.removeChild(_hRemove.firstChild);
				}
			}
		}
	}
}

function addClassesElement(_hParent, _aClasses) {
	if (typeof _aClasses === 'object') {
		for (const _sClass of _aClasses) {
			if (_hParent) _hParent.classList.add(_sClass);
		}
	} else if (_aClasses) {
		if (_hParent) _hParent.classList.add(_aClasses);
	}
}
