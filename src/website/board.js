/* Moved out, for changes in other scripts */
let hBoard = undefined;

function loadAnimeBoard() {
	hBoard = createDiv(document.body, '', 'board-uVL3djCA');
	const _hHeader = createDiv(hBoard, '', 'header-yeJQ9cYR');

	const _hLeftSide = createDiv(_hHeader, '', 'left-rRNySA25');
	createDivImg(_hLeftSide, '', 'button-cH9xa8qr', 'assets/left-arrow.svg', (_hChild) => {
		_hChild.onclick = function () {
			getData(true, 'boardVisibled', (_response) => {
				if (_response) {
					/* When you close the board, the menus are removed */
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
							_addAnimeCard({
									id: _sAnimeCardId,
									image: _response?.image,
									titles: _response?.titles,
									episodesViewed: _response?.episodesViewed,
									episodes: _response?.episodes,
									seasons: _response?.seasons,
									status: _response?.status,
									viewedStatus: _response?.viewedStatus,
									desc: _response?.desc,
									sites: _response?.sites,
									rating: _response?.rating,
									position: _response?.position
								}
							);
						});
					} else {
						_addAnimeCard();
					}
				}
			}
		};
	});

	function _addAnimeCard(_jCard) {
		const _hContent = createDiv(_hAddAnimeButton, '', 'content-n5tgZWEy');
		/* The content is in the button and has an absolute position, so it cannot have a body height if you specify css properties */
		_hContent.style.height = `calc(${_hBody.offsetHeight}px + var(--board-header-height-xg3EuWjd))`;

		createLabel(_hContent, '', '', 'animeLabelEditImage', 'anime-image-edit-nZsR8KNQ');
		createInput(_hContent, 'anime-image-edit-nZsR8KNQ', '', 'hintTextInput', (_hChild) => {
			if (_jCard?.image) _hChild.value = _jCard?.image;
		});

		createLabel(_hContent, '', '', 'animeLabelEditTitles', 'anime-title-edit-NxMNE4ex');
		createInput(_hContent, 'anime-titles-edit-NxMNE4ex', '', 'hintTextInput', (_hChild) => {
			if (_jCard?.titles) _hChild.value = _jCard?.titles;
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

				if (_jCard?.episodesViewed) _hChild.value = _jCard?.episodesViewed;
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

				if (_jCard?.episodes) _hChild.value = _jCard?.episodes;
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
			if (_jCard?.seasons) _hChild.value = _jCard?.seasons;
		});

		createLabel(_hContent, '', '', 'animeLabelEditAnimeStatus', 'anime-anime-status-edit-FkrUy296');
		const selectAnimeStatus = createSelect(_hContent, 'anime-anime-status-edit-FkrUy296', '', 'hintSelectInput', [
			['animeStatus1', '1'],
			['animeStatus2', '2'],
			['animeStatus3', '3']
		]);
		if (_jCard?.status) select(selectAnimeStatus, _jCard?.status);

		createLabel(_hContent, '', '', 'animeLabelEditViewStatus', 'anime-view-status-edit-JvJsUY9y');
		const selectViewStatus = createSelect(_hContent, 'anime-view-status-edit-JvJsUY9y', '', 'hintSelectInput', [
			['animeViewStatus1', '1'],
			['animeViewStatus2', '2'],
			['animeViewStatus3', '3'],
			['animeViewStatus4', '4']
		]);
		if (_jCard?.viewedStatus) select(selectViewStatus, _jCard?.viewedStatus);

		createLabel(_hContent, '', '', 'animeLabelEditDesc', 'anime-desc-edit-emn6pGAH');
		createTextarea(_hContent, 'anime-desc-edit-emn6pGAH', '', 'hintTextInput', (_hChild) => {
			if (_jCard?.desc) _hChild.value = _jCard?.desc;
		});

		createLabel(_hContent, '', '', 'animeLabelEditSites', 'anime-sites-edit-Q3usD5jw');
		createInput(_hContent, 'anime-sites-edit-Q3usD5jw', '', 'hintTextInput', (_hChild) => {
			if (_jCard?.sites) _hChild.value = _jCard?.sites;
		});

		createLabel(_hContent, '', '', 'animeLabelEditAnimeRating', 'anime-rating-edit-CW48Shh3', (_hChild) => {
			_hChild.style.textAlign = 'center';
		});
		const _hRating = createSelectRating(_hContent, 'anime-rating-edit-CW48Shh3', '');
		if (_jCard?.rating) selectRating(_hRating, _jCard?.rating);

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
					let _sId = _jCard?.id || genId();

					if (_response) {
						while (_response.includes(_sId) && !_jCard?.id) {
							_sId = genId();
						}
					}

					/* Card adding */
					if (!_jCard?.id) {
						const _aAnimeCardIds = _response || [];
						/* To have the new card on top, unshift and a zero position are used */
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

		const _bIsError = _jCard?.error || false;
		if (_jCard?.id && !_bIsError) {
			createButton(_hContent, '', 'delete-88jPHdRH', 'animeLabelEditDelete', (_hChild) => {
				_hChild.onclick = function () {
					getData(false, 'animeCardIds', (_response) => {
						const _aAnimeCardIds = _response || [];
						/* Card deleting */
						if (_aAnimeCardIds.indexOf(_jCard?.id) > 0) _aAnimeCardIds.splice(_aAnimeCardIds.indexOf(_jCard?.id), 1);

						setData(false, 'animeCardIds', _aAnimeCardIds);
						setData(false, `animeCardId${_jCard?.id}`, null);

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
		/* Getting the scroll bar position to save and setting the same one after displaying */
		const _nScrollPos = _hBody.scrollTop;

		/* Removing old cards */
		removeElement('anime-cards-MfRGWNqC', 'removed-UEg2H5Ps');

		/* An array that will store the finished divs, for later display */
		const _DivsCard = new Map();

		getData(false, 'animeCardIds', (_response) => {
			if (_response) {
				const _aCardIds = [];
				_continueUpdateAnimeCard();

				function _continueUpdateAnimeCard() {
					for (const _jId of _response) {

						_aCardIds.unshift(_jId);

						/* Creating fake cards */
						if (!document.getElementById(`anime-load-card-${_jId}`)) {
							createDiv(_hAnimeCards, `anime-load-card-${_jId}`, 'anime-load-card-PMb84E8y', (_hCard) => {
								createMargin(_hCard, 'embed');
								createDiv(_hCard, '', 'anime-load-card-image-GQtx92fM');
								createMargin(_hCard, 'embed');
								createDiv(_hCard, '', 'anime-load-card-title-3Wgg5PKh');
								createMargin(_hCard, 'embed');
								createDiv(_hCard, '', 'anime-load-card-desc-W3cU2ueU');
								createMargin(_hCard, 'embed');
							});
						}

						/* Creating real cards */
						getData(false, `animeCardId${_jId}`, (_jAnimeCard) => {
							try {
								/* The object is accessed directly, without an existence check, to handle the error in the catch block.  */
								const _sTitles = _jAnimeCard.titles;
								const _sImage = _jAnimeCard.image;
								const _sEpisodesViewed = _jAnimeCard.episodesViewed;
								const _sEpisodes = _jAnimeCard.episodes;
								const _sSeasons = _jAnimeCard.seasons;
								const _sStatus = _jAnimeCard.status;
								const _sViewedStatus = _jAnimeCard.viewedStatus;
								const _sDesc = _jAnimeCard.desc;
								const _sSites = _jAnimeCard.sites;
								const _sRating = _jAnimeCard.rating;
								let _sPosition = _jAnimeCard.position;

								/* Sorting positions */
								while (_DivsCard.has(_sPosition.toString())) {
									_sPosition++;
								}

								/* Cards are first created and stacked in Map, for later display */
								_DivsCard.set(_sPosition.toString(), createDiv(null, `anime-card-${_jId}`, 'anime-card-PgjFjRUS', (_hCard) => {
									/* A card is given a special attribute to speed up its position */
									_hCard.setAttribute('position', _sPosition.toString());

									/* Enabling card drag and drop */
									_hCard.tabIndex = 0;
									_hCard.draggable = true;

									sendLog('ggs4xgWMfbZYBpfK', LOG_TYPES.LOG, {ggs4xgWMfbZYBpfK: _response});
									sendLog('Uj46Tcr3xr4dN9L7', LOG_TYPES.LOG, {
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
											/* Rating stars display, the number from the database is colored as selected, the other stars remain normal */
											for (let _nStarts = 1; _nStarts <= parseInt(_sRating); _nStarts++) {
												const _hSpan = document.createElement('span');
												_hChild.append(_hSpan);
												_hSpan.classList.add('fa', 'fa-star', 'checked-cFXHwS3x', 'anime-card-other-WUg8SV9z');
											}

											for (let _nStarts = 1; _nStarts <= 5 - parseInt(_sRating); _nStarts++) {
												const _hSpan = document.createElement('span');
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
												/* For a nice display, the protocol is erased and the first letter of the domain is capitalized */
												let _sTitle = _sLink
												.replace('https://', '')
												.replace('http://', '')
												.replace('www.', '');
												_sTitle = capitalizeFirstLetter(_sTitle);

												/* Split splits the reference into an array, 0 means domain selection */
												_sTitle = (_sTitle + '/').split('/')[0];

												if (_sTitle) {
													createLink(_hChild, '', '', _sTitle, _sLink, '', (_hChild) => {
														if (document.URL === _sLink) _hChild.style.background = 'var(--main-color-rVwK3Nh4)';
													});
												}
											}
										});
									}

									if (_sEpisodesViewed && _sEpisodes) {
										createMargin(_hCard, 'embed', 'anime-card-other-WUg8SV9z');
										createDiv(_hCard, '', 'anime-card-episodes-y6qHgvQw', (_hChild) => {
											createDiv(_hChild, '', '', (_hChild) => {
												/* Because of the peculiar system, the information is not in one line, but several labels */
												createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', 'animeCardEpisodes1');
												createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', _sEpisodesViewed);
												createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', 'animeCardEpisodes2');
												createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', `${_sEpisodes},`);
												createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', 'animeCardEpisodes3');
												createLabel(_hChild, '', 'anime-card-other-WUg8SV9z', _sSeasons);
											});
											createMargin(_hChild, 'embed', 'anime-card-other-WUg8SV9z');

											/* Values must be greater than zero, and the episodes viewed cannot be greater than the episodes in the show */
											if (parseInt(_sEpisodes) > 0 && parseInt(_sEpisodesViewed) > 0 && parseInt(_sEpisodes) >= parseInt(_sEpisodesViewed)) {
												/* The width of the progress bar is the percentage of all episodes watched */
												const _nProgress = Math.round((parseInt(_sEpisodesViewed) * 100 / parseInt(_sEpisodes))).toString();
												createDiv(_hChild, '', 'anime-card-progress-Vdx7xbRM', (_hChild) => {
													_hChild.style.width = `${_nProgress}%`;
												});
											}
										});
									} else {
										/* Since the block is a closing block, if it is not, its indentation must be in any case */
										createMargin(_hCard, 'embed', 'anime-card-other-WUg8SV9z');
									}

									/* Tabindex did not work, so the focus is set by clicking on the card */
									_hCard.onclick = function (_event) {
										if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
											_hCard.focus();
										}
									};

									/* Card movement system */
									/* When a card is dragged, its identifier is saved in the data, so you can swap cards later */
									_hCard.ondragstart = function (_event) {
										if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
											_event.dataTransfer.setData('anime-card', _event.target.id.toString());
											document.getElementById(_event.target.id).focus();
										}
									};

									_hCard.ondrop = function (_event) {
										if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
											_event.preventDefault();

											const _jSwitchedOnId = _event.dataTransfer.getData('anime-card').replace('anime-card-', '');

											/* Changing positions */
											getData(false, `animeCardId${_jSwitchedOnId}`, (_jSwitchedAtCard) => {
												if (_jSwitchedOnId !== _jId) {
													document.getElementById(`anime-card-${_jId}`).classList.add('on-drop-x4YnDmpC');

													let _jSwitchedAt = _jAnimeCard;

													_jSwitchedAt.position = document.getElementById(`anime-card-${_jSwitchedOnId}`)
													.getAttribute('position') || 0;
													setData(false, `animeCardId${_jId}`, _jSwitchedAt);

													let _jSwitchedOn = _jSwitchedAtCard;
													_jSwitchedOn.position = _sPosition;
													setData(false, `animeCardId${_jSwitchedOnId}`, _jSwitchedOn);

													setTimeout(_updateAnimeCard, 1000);
												}
											});
										}
									};

									_hCard.ondragover = function (_event) {
										if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
											_event.preventDefault();
										}
									};

									/* Setting the card id for the editing system */
									_hCard.onfocus = function (_event) {
										if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
											_hAddAnimeButton.style.backgroundImage = `url(${getLocalUrl('assets/edit.svg')})`;
											_hAddAnimeButton.setAttribute('value', _event.target.id);
										}
									};

									/* Deleting a card id from the editing system */
									_hCard.onblur = function (_event) {
										if (_event.target.id.includes('anime-card') || _event.target.className.includes('anime-card')) {
											_hAddAnimeButton.style.backgroundImage = `url(${getLocalUrl('assets/plus.svg')})`;

											setTimeout(_removeAttribute, 1000);

											function _removeAttribute() {
												_hAddAnimeButton.removeAttribute('value');
											}
										}
									};

									/* It is easier for me to say in general that it is a system, because there are also comments on its elements, and I do not want to duplicate */
								}));

								/* If the sorting was successful and the value of the saved divs matches the database */
								if (_response.length === _DivsCard.size) {
									sendLog('G98yhVDYxDZEc72z', LOG_TYPES.LOG, {
										divsCard: _DivsCard
									});

									/* Removing fake cards */
									removeClassElements('anime-load-card-PMb84E8y', 'removed-UEg2H5Ps');

									/* Since sorting does not set the order, the cards do not go one after the other, you can get positions 3 and 6, so the for loop will not work */
									let _nIndex = 0;
									while (_DivsCard.size > 0) {
										if (_DivsCard.has(_nIndex.toString())) {
											const _hDiv = _DivsCard.get(_nIndex.toString());
											if (_hDiv) _hAnimeCards.append(_hDiv);
											_DivsCard.delete(_nIndex.toString());
										}
										_nIndex++;
									}

									if (_nScrollPos) _hBody.scrollTop = _nScrollPos;
								}
							} catch (_e) {
								/* Card removal system for 3 errors at a time */
								if (_response && _jId) {
									_response.splice(_response.indexOf(_jId), 1);

									/* Changing a fake card into a card with an error */
									const _hCard = document.getElementById(`anime-load-card-${_jId}`);
									_hCard.innerHTML = '';
									_hCard.classList.remove('anime-load-card-PMb84E8y');
									_hCard.classList.add('anime-load-error-card-PTbkZ3J8');
									createDiv(_hCard, '', '', (_hChild) => {
										createLabel(_hChild, '', 'title-pJ2WhhWd', 'errorLoading');
										createMargin(_hChild, 'short');
										createLabel(_hChild, '', '', 'animeCard');
										createLabel(_hChild, '', '', ':');
										createLabel(_hChild, '', 'id-f8YW3fne', `${_jId}`);
										createMargin(_hChild, 'embed');
										createLabel(_hChild, '', 'error-ypPZP2fz', `${_e}`);
										createMargin(_hChild, 'embed');

										/* Div with Buttons */
										createDiv(_hChild, '', 'buttons-6dt3Ne7p', (_hChild) => {
											/* Card deletion button */
											createLabel(_hChild, '', '', 'animeCardDelete', '', (_hChild) => {
												_hChild.onclick = function (_event) {
													getData(false, 'animeCardIds', (_response) => {
														_response.splice(_response.indexOf(_jId), 1);
														setData(false, 'animeCardIds', _response);
														setData(false, `animeCardId${_jId}`, null);
														setTimeout(_updateAnimeCard, 1000);
													});
												};
											});

											/* Card recreate button */
											createLabel(_hChild, '', '', 'animeCardReCreate', '', (_hChild) => {
												_hChild.onclick = function (_event) {
													/* In the create card menu, the existing parameters of the broken card are transferred */
													getData(false, `animeCardId${_jId}`, (_card) => {
														if (_card) {
															_card.id = _jId;
															_card.error = true;
															/* Update the list of cards by pressing the save button in the menu */
															_addAnimeCard(_card);
															setData(false, `animeCardId${_jId}`, null);
														}
													});
												};
											});
										});
									});

									_continueUpdateAnimeCard();
								}

								sendLog('RAxm3R7HH3cYxj6q', LOG_TYPES.ERR, {RAxm3R7HH3cYxj6q: _e});
							}
						});
					}
				}
			}
		});
	}
}