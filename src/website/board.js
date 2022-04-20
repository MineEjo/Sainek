let hBoard = undefined;
let hButtonVisibleBoard = undefined;

function loadAnimeBoard() {
	hBoard = createDiv(document.body, '', 'board-uVL3djCA');
	const _hHeader = createDiv(hBoard, '', 'header-yeJQ9cYR');

	const _hLeftSide = createDiv(_hHeader, '', 'left-rRNySA25');
	hButtonVisibleBoard = createDivImg(_hLeftSide, '', 'button-cH9xa8qr', 'assets/left-arrow.svg', (_hChild) => {
		_hChild.onclick = function () {
			getData(true, 'boardVisibled', (_response) => {
				if (_response) {
					removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
					removeClassElements('content-bXB3As76', 'removed-UEg2H5Ps');

					setData(true, 'boardVisibled', false);

					setVisibleBoard(false);
					setAttachBoard(false);
				} else {
					setData(true, 'boardVisibled', true);
					setVisibleBoard(true);

					getData(true, 'boardAttached', (_response) => {
						setAttachBoard(_response);
					});
				}
			});
		};
	});

	createDivImg(_hLeftSide, '', 'item-aEVEr3Cy', 'assets/icon.png');

	const _hLabels = createDiv(_hLeftSide, '', 'left-rRNySA25');
	createLabel(_hLabels, '', 'title-LRrB3Fxn', 'logoTitle');
	createLabel(_hLabels, '', 'desc-p2P54kC8', 'logoDesc');

	const _hRightSide = createDiv(_hHeader, '', 'right-W2VyGzAy');

	createDivImg(_hRightSide, '', 'button-cH9xa8qr', 'assets/menu.svg', (_hChild) => {
		_hChild.onclick = function (_event) {
			if (_event?.target?.classList.contains('button-cH9xa8qr')) {
				if (_hHeader.getElementsByClassName('content-bXB3As76')[0]) {
					removeClassElements('content-bXB3As76', 'removed-UEg2H5Ps');
				} else {
					const _hContent = createDiv(_hChild, '', 'content-bXB3As76');

					getData(true, 'boardAttached', (_response) => {
						if (!_response) {
							createLabel(_hContent, '', '', `menuButtonAttachBoard`, '', (_hChild) => {
								_hChild.onclick = function () {
									setData(true, 'boardAttached', true);
									setAttachBoard(true);
									removeClassElements('content-bXB3As76', 'removed-UEg2H5Ps');
								};
							});
						} else {
							createLabel(_hContent, '', '', `menuButtonDetachBoard`, '', (_hChild) => {
								_hChild.onclick = function () {
									setData(true, 'boardAttached', false);
									setAttachBoard(false);
									removeClassElements('content-bXB3As76', 'removed-UEg2H5Ps');
								};
							});
						}
					});
				}
			}
		};
	});

	const _hBody = createDiv(hBoard, '', 'body-3y53QZt3');
	const _hAnimeCards = createDiv(_hBody, 'anime-cards-MfRGWNqC', '');

	_updateAnimeCard();

	const _hFooter = createDiv(hBoard, '', 'footer-3y53QZt3');
	const _hBodyButtons = createDiv(_hFooter, '', 'buttons-QaPT76h4');
	const _hAddAnimeButton = createDivImg(_hBodyButtons, '', 'button-cH9xa8qr', 'assets/plus.svg', (_hChild) => {
		_hChild.onclick = function (_event) {
			if (_event?.target?.classList.contains('button-cH9xa8qr')) {
				if (_hChild.getElementsByClassName('content-n5tgZWEy')[0]) {
					removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
					_hChild.style.backgroundImage = `url(${getLocalUrl('assets/plus.svg')})`;
				} else {
					let _sAnimeCardId = _hChild.getAttribute('value');
					if (_sAnimeCardId) {
						_sAnimeCardId = _sAnimeCardId.replace('anime-card-', '');

						getData(false, `animeCardId${_sAnimeCardId}`, (_response) => {
							_addAnimeCard(
								_sAnimeCardId,
								_response?.image,
								_response?.titles,
								_response?.episodesViewed,
								_response?.episodes,
								_response?.seasons,
								_response?.status,
								_response?.viewedStatus,
								_response?.desc,
								_response?.sites,
								_response?.rating,
								_response?.position
							);
						});
					} else {
						_addAnimeCard();
					}
				}
			}
		};
	});

	function _addAnimeCard(_sfId, _sfImage, _sfTitles, _sfEpisodesViewed, _sfEpisodes, _sfSeasons, _sfStatus, _sfViewedStatus, _sfDesc, _sfSites, _sfRating, _sfPosition) {
		const _hContent = createDiv(_hAddAnimeButton, '', 'content-n5tgZWEy');
		_hContent.style.height = `calc(${_hBody.offsetHeight}px + var(--board-header-height-xg3EuWjd))`;

		createLabel(_hContent, '', '', 'animeLabelEditImage', 'anime-image-edit-nZsR8KNQ');
		createInput(_hContent, 'anime-image-edit-nZsR8KNQ', '', 'hintTextInput', (_hChild) => {
			if (_sfImage) _hChild.value = _sfImage;
		});

		createLabel(_hContent, '', '', 'animeLabelEditTitles', 'anime-title-edit-NxMNE4ex');
		createInput(_hContent, 'anime-titles-edit-NxMNE4ex', '', 'hintTextInput', (_hChild) => {
			if (_sfTitles) _hChild.value = _sfTitles;
		});

		createLabel(_hContent, '', '', 'animeLabelEditEpisodes', '');
		createDiv(_hContent, '', '', (_hChild) => {
			_hChild.style.display = 'inline-flex';
			createInput(_hChild, 'anime-episodes-viewed-edit-jWKxUqGL', '', 'hintNumberInput', (_hChild) => {
				_hChild.setAttribute('type', 'number');

				_hChild.onkeyup = function () {
					this.value = this.value.substring(0, 4);
				};

				_hChild.setAttribute('min', '0');
				_hChild.style.width = '100%';
				_hChild.style.textAlign = 'center';

				if (_sfEpisodesViewed) _hChild.value = _sfEpisodesViewed;
			});
			createLabel(_hChild, '', '', 'labelOf', '', (_hChild) => {
				_hChild.style.paddingTop = '13px';
				_hChild.style.paddingLeft = '8%';
				_hChild.style.paddingRight = '12%';
			});
			createInput(_hChild, 'anime-episodes-edit-ZpfNGnBG', '', 'hintNumberInput', (_hChild) => {
				_hChild.setAttribute('type', 'number');
				_hChild.onkeyup = function () {
					this.value = this.value.substring(0, 4);
				};
				_hChild.setAttribute('min', '0');
				_hChild.style.width = '100%';
				_hChild.style.textAlign = 'center';

				if (_sfEpisodes) _hChild.value = _sfEpisodes;
			});
			createInput(_hChild, '', '', '', (_hChild) => {
				_hChild.style.width = '0px';
				_hChild.style.padding = '0px';
				_hChild.style.margin = '0px';
				_hChild.style.opacity = '0';
				_hChild.style.visibility = 'hidden';
				_hChild.style.display = 'none';
			});
		});

		createLabel(_hContent, '', '', 'animeLabelEditSeasons', '');
		createInput(_hContent, 'anime-seasons-edit-AcTuxFRH', '', 'hintNumberInput', (_hChild) => {
			_hChild.setAttribute('type', 'number');
			_hChild.onkeyup = function () {
				this.value = this.value.substring(0, 4);
			};
			_hChild.setAttribute('min', '0');
			if (_sfSeasons) _hChild.value = _sfSeasons;
		});

		createLabel(_hContent, '', '', 'animeLabelEditAnimeStatus', 'anime-anime-status-edit-FkrUy296');
		const selectAnimeStatus = createSelect(_hContent, 'anime-anime-status-edit-FkrUy296', '', 'hintSelectInput', [
			['animeStatus1', '1'],
			['animeStatus2', '2'],
			['animeStatus3', '3']
		]);
		if (_sfStatus) select(selectAnimeStatus, _sfStatus);

		createLabel(_hContent, '', '', 'animeLabelEditViewStatus', 'anime-view-status-edit-JvJsUY9y');
		const selectViewStatus = createSelect(_hContent, 'anime-view-status-edit-JvJsUY9y', '', 'hintSelectInput', [
			['animeViewStatus1', '1'],
			['animeViewStatus2', '2'],
			['animeViewStatus3', '3'],
			['animeViewStatus4', '4']
		]);
		if (_sfViewedStatus) select(selectViewStatus, _sfViewedStatus);

		createLabel(_hContent, '', '', 'animeLabelEditDesc', 'anime-desc-edit-emn6pGAH');
		createTextarea(_hContent, 'anime-desc-edit-emn6pGAH', '', 'hintTextInput', (_hChild) => {
			if (_sfDesc) _hChild.value = _sfDesc;
		});

		createLabel(_hContent, '', '', 'animeLabelEditSites', 'anime-sites-edit-Q3usD5jw');
		createInput(_hContent, 'anime-sites-edit-Q3usD5jw', '', 'hintTextInput', (_hChild) => {
			if (_sfSites) _hChild.value = _sfSites;
		});

		createLabel(_hContent, '', '', 'animeLabelEditAnimeRating', 'anime-rating-edit-CW48Shh3', (_hChild) => {
			_hChild.style.textAlign = 'center';
		});
		const _hRating = createSelectRating(_hContent, 'anime-rating-edit-CW48Shh3', '');
		if (_sfRating) selectRating(_hRating, _sfRating);

		createButton(_hContent, '', 'save-Hj3Cfy9A', 'animeLabelEditSave', (_hChild) => {
			_hChild.onclick = function () {
				const _sImage = document.getElementById('anime-image-edit-nZsR8KNQ').value;
				const _sTitles = document.getElementById('anime-titles-edit-NxMNE4ex').value;
				if (!_sTitles) return alert(getLocale('alertRequiredTitlesEdit'));

				let _sEpisodesViewed = document.getElementById('anime-episodes-viewed-edit-jWKxUqGL').value;
				const _sEpisodes = document.getElementById('anime-episodes-edit-ZpfNGnBG').value;
				const _sSeasons = document.getElementById('anime-seasons-edit-AcTuxFRH').value;
				const _sStatus = document.getElementById('anime-anime-status-edit-FkrUy296').getAttribute('value');
				const _sViewedStatus = document.getElementById('anime-view-status-edit-JvJsUY9y').getAttribute('value');
				if (_sViewedStatus < 1) return alert(getLocale('alertRequiredViewStatusEdit'));

				const _sDesc = document.getElementById('anime-desc-edit-emn6pGAH').value;
				const _sSites = document.getElementById('anime-sites-edit-Q3usD5jw').value;
				const _sRating = document.getElementById('anime-rating-edit-CW48Shh3').getAttribute('value');

				getData(false, 'animeCardIds', (_response) => {
					let _sId = (_sfId) ? _sfId : genId();

					if (_response) {
						while (_response.includes(_sId) && !_sfId) {
							_sId = genId();
						}
					}

					if (!_sfId) {
						const _aAnimeCardIds = [];

						if (_response) {
							try {
								for (const _sId of _response) {
									_aAnimeCardIds.push(_sId);
								}
							} catch (_e) {
								sendLog('err', 'taaZTwuP3zZnZjMv', 'board.js', {taaZTwuP3zZnZjMv: _e});
							}
						}
						_aAnimeCardIds.unshift(_sId);
						setData(false, 'animeCardIds', _aAnimeCardIds);
					}

					setData(false, `animeCardId${_sId}`, {
						image: _sImage.toString(),
						titles: _sTitles.toString(),
						episodesViewed: (_sEpisodesViewed) ? _sEpisodesViewed.toString() : 0,
						episodes: (_sEpisodes) ? _sEpisodes.toString() : 0,
						seasons: (_sSeasons) ? _sSeasons.toString() : 0,
						status: _sStatus.toString(),
						viewedStatus: _sViewedStatus.toString(),
						desc: _sDesc.toString(),
						sites: _sSites.toString(),
						rating: _sRating.toString(),
						position: '0'
					});

					setTimeout(_updateAnimeCard, 1000);
					removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
					_hAddAnimeButton.style.backgroundImage = `url(${getLocalUrl('assets/plus.svg')})`;
				});
			};
		});

		if (_sfId) {
			createButton(_hContent, '', 'delete-88jPHdRH', 'animeLabelEditDelete', (_hChild) => {
				_hChild.onclick = function () {

					getData(false, 'animeCardIds', (_response) => {
						const _aAnimeCardIds = [];

						try {
							for (const _sId of _response) {
								if (_sId !== _sfId) _aAnimeCardIds.push(_sId);
							}
						} catch (_e) {
							sendLog('err', 'h3qSQpbN5f5hd4BP', 'board.js', {h3qSQpbN5f5hd4BP: _e});
						}

						setData(false, 'animeCardIds', _aAnimeCardIds);
						setData(false, `animeCardId${_sfId}`, null);

						setTimeout(_updateAnimeCard, 1000);
						removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
						_hAddAnimeButton.style.backgroundImage = `url(${getLocalUrl('assets/plus.svg')})`;
					});
				};
			});
		}

		_hAddAnimeButton.style.backgroundImage = `url(${getLocalUrl('assets/cross.svg')})`;
	}

	function _updateAnimeCard() {
		const _nScrollPos = document.getElementById('anime-cards-MfRGWNqC').scrollTop;

		removeElements('anime-cards-MfRGWNqC');

		const _PositionsCard = new Map();
		const _DivsCard = new Map();

		getData(false, 'animeCardIds', (_response) => {
			if (_response) {
				for (const _jId of _response) {
					getData(false, `animeCardId${_jId}`, (_jAnimeCard) => {
						let _sTitles = null;

						try {
							_sTitles = _jAnimeCard.titles;
						} catch (_e) {
							_response.splice(_response.indexOf(_jId), 1);
							setData(false, 'animeCardIds', _response);
							setData(false, `animeCardId${_jId}`, null);
							sendLog('err', 'KeQL6r88LMJvJ6n2', 'board.js', {KeQL6r88LMJvJ6n2: _e});
						}

						if (_sTitles) {
							const _sImage = _jAnimeCard?.image;
							const _sEpisodesViewed = _jAnimeCard?.episodesViewed;
							const _sEpisodes = _jAnimeCard?.episodes;
							const _sSeasons = _jAnimeCard?.seasons;
							const _sStatus = _jAnimeCard?.status;
							const _sViewedStatus = _jAnimeCard?.viewedStatus;
							const _sDesc = _jAnimeCard?.desc;
							const _sSites = _jAnimeCard?.sites;
							const _sRating = _jAnimeCard?.rating;
							const _sPosition = _jAnimeCard?.position;

							/* Re-sort items to avoid duplicates. */
							if (_PositionsCard.has(_sPosition)) _PositionsCard.set(`${_PositionsCard.size}`, _jId)
							else _PositionsCard.set(_sPosition, _jId)

							/* "Map" takes a position as a key, a duplicate will cause the key to be overwritten,
							which will cause the sort method to not be called in the future, to display the cards. */

							_DivsCard.set(_jId, createDiv(null, `anime-card-${_jId}`, 'anime-card-PgjFjRUS', (_hCard) => {
								_hCard.tabIndex = 0;
								_hCard.draggable = true;
								sendLog('log', 'ggs4xgWMfbZYBpfK', 'board.js', {ggs4xgWMfbZYBpfK: _response});
								sendLog('log', 'Uj46Tcr3xr4dN9L7', 'board.js', {
									animeCard: {
										id: _jId,
										title: _sTitles,
										image: _sImage,
										episodesViewed: _sEpisodesViewed,
										episodes: _sEpisodes,
										seasons: _sSeasons,
										status: _sStatus,
										viewedStatus: _sViewedStatus,
										desc: _sDesc,
										sites: _sSites,
										rating: _sRating,
										position: _sPosition
									}
								});

								/* Card design */

								if (_sViewedStatus) {
									createLabel(_hCard, '',
										['anime-card-viewed-status-5cBUD2rC', STATUSES.get(_sViewedStatus)], `animeViewStatus${_sViewedStatus}`
									);
								}

								if (_sStatus) {
									createLabel(_hCard, '', 'anime-card-status-5cBUD2rC', `animeStatus${_sStatus}`);
								}

								if (_sImage) {
									createMargin(_hCard, 'embed', 'anime-card-other-WUg8SV9z');
									createDiv(_hCard, '', 'anime-card-image-2gZc3pYt', (_hChild) => {
										_hChild.style.backgroundImage = `url(${_sImage})`;
									});
								}

								if (_sTitles) {
									createMargin(_hCard, 'embed', 'anime-card-other-WUg8SV9z');
									createLabel(_hCard, '', 'anime-card-title-A5xU6DER', `${
										_sTitles.toString().split(', ')[0]
									}`);
								}

								if (_sRating) {
									createDiv(_hCard, '', 'anime-card-rating-J9RU4MjX', (_hChild) => {
										for (let _nStarts = 1; _nStarts <= parseInt(_sRating); _nStarts++) {
											const _hSpan = document.createElement('span');
											_hSpan.classList.add('fa', 'fa-star', 'anime-card-other-WUg8SV9z');
											_hChild.append(_hSpan);
											_hSpan.classList.add('fa', 'fa-star', 'checked-cFXHwS3x', 'anime-card-other-WUg8SV9z');
										}

										for (let _nStarts = 1; _nStarts <= 5 - parseInt(_sRating); _nStarts++) {
											const _hSpan = document.createElement('span');
											_hSpan.classList.add('fa', 'fa-star', 'anime-card-other-WUg8SV9z');
											_hChild.append(_hSpan);
											_hSpan.classList.add('fa', 'fa-star', 'anime-card-other-WUg8SV9z');
										}
									});
								}

								if (_sDesc) {
									createMargin(_hCard, 'short', 'anime-card-other-WUg8SV9z');
									createLabel(_hCard, '', 'anime-card-desc-DtYkVa9G', _sDesc);
								}

								if (_sSites) {
									createMargin(_hCard, 'embed', 'anime-card-other-WUg8SV9z');
									createDiv(_hCard, '', 'anime-card-sites-DtYkVa9G', (_hChild) => {
										for (const _sLink of _sSites.split(', ')) {
											let _sTitle = _sLink
											.replace('https://', '')
											.replace('http://', '');

											_sTitle = capitalizeFirstLetter(_sTitle);
											_sTitle = _sTitle.split('/')[0];

											if (_sTitle) {
												createLink(_hChild, '', '', _sTitle, _sLink, '', (_hChild) => {
													if (document.URL === _sLink) {
														_hChild.style.background = 'var(--main-color-rVwK3Nh4)';
													}
												});
											}
										}
									});
								}

								if (_sEpisodesViewed && _sEpisodes) {
									createMargin(_hCard, 'embed', 'anime-card-other-WUg8SV9z');
									createDiv(_hCard, '', 'anime-card-episodes-y6qHgvQw', (_hChild) => {
										createDiv(_hChild, '', '', (_hChild) => {
											createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', 'animeCardEpisodes1');
											createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', _sEpisodesViewed);
											createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', 'animeCardEpisodes2');
											createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', `${_sEpisodes},`);
											createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', 'animeCardEpisodes3');
											createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', _sSeasons);
										});
										createMargin(_hChild, 'embed', 'anime-card-other-WUg8SV9z');

										if (parseInt(_sEpisodes) > 0 && parseInt(_sEpisodesViewed) > 0 && parseInt(_sEpisodes) >= parseInt(_sEpisodesViewed)) {
											const _nProgress = Math.round((parseInt(_sEpisodesViewed) * 100 / parseInt(_sEpisodes))).toString();
											createDiv(_hChild, '', 'anime-card-progress-Vdx7xbRM', (_hChild) => {
												_hChild.style.width = `${_nProgress}%`;
											});
										}
									});
								} else {
									createMargin(_hCard, 'embed', 'anime-card-other-WUg8SV9z');
								}

								_hCard.onclick = function (_event) {
									if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
										_hCard.focus();
									}
								};

								_hCard.ondragstart = function (_event) {
									if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
										_event.dataTransfer.setData('anime-card', _event.target.id.toString()
										.replace('anime-card-', ''));
									}
								};


								_hCard.ondrop = function (_event) {
									if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
										_event.preventDefault();

										const _jSwitchedOnId = _event.dataTransfer.getData('anime-card');

										getData(false, `animeCardId${_jSwitchedOnId}`, (_jSwitchedAtCard) => {
											if (_jSwitchedOnId !== _jId) {
												let _jSwitchedAt = _jAnimeCard;
												_jSwitchedAt.position = invertMap(_PositionsCard).get(_jSwitchedOnId);
												setData(false, `animeCardId${_jId}`, _jSwitchedAt);

												let _jSwitchedOn = _jSwitchedAtCard;
												_jSwitchedOn.position = invertMap(_PositionsCard).get(_jId);
												setData(false, `animeCardId${_jSwitchedOnId}`, _jSwitchedOn);

												_updateAnimeCard();
											}
										});
									}
								};

								_hCard.ondragover = function (_event) {
									if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
										_event.preventDefault();
									}
								};

								_hCard.onfocus = function (_event) {
									if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
										_hAddAnimeButton.style.backgroundImage = `url(${getLocalUrl('assets/edit.svg')})`;
										_hAddAnimeButton.setAttribute('value', _event.target.id);
									}
								};

								_hCard.onblur = function (_event) {
									if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
										_hAddAnimeButton.style.backgroundImage = `url(${getLocalUrl('assets/plus.svg')})`;

										setTimeout(_removeAttribute, 1000);

										function _removeAttribute() {
											_hAddAnimeButton.removeAttribute('value');
										}
									}
								};
							}));

							if (_response.length === _PositionsCard.size) {
								sendLog('log', 'G98yhVDYxDZEc72z', 'board.js', {
									positionsCard: _PositionsCard,
									divsCard: _DivsCard
								});

								for (let _nPos = 0; _nPos < _PositionsCard.size; _nPos++) {
									const _hDiv = _DivsCard.get(_PositionsCard.get(_nPos.toString()));
									if (_hDiv) _hAnimeCards.append(_hDiv);
								}

								if (_nScrollPos) {
									document.getElementById('anime-cards-MfRGWNqC').scrollTop = _nScrollPos;
								}
							}
						}
					});
				}
			}
		});
	}
}