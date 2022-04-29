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

/* Moved out, for changes in other scripts */
let hBoard = undefined;

function loadBoard() {
	hBoard = createDiv(document.body, '', ['board-uVL3djCA', 'shadow-pUd54mwX']);

	const _hBody = createDiv(hBoard, '', 'body-3y53QZt3');
	const _hNotes = createDiv(_hBody, 'notes-MfRGWNqC', '');

	_updateNotes();

	const _hAddNoteButton = createButton(_hBody, '', ['button-cH9xa8qr', 'shadow-pUd54mwX', 'add-rNC4zfHN'], '', (_hChild) => {
		_hChild.setAttribute('locale-edit', getLocale('edit'));
		_hChild.setAttribute('locale-add', getLocale('add'));
		_hChild.setAttribute('locale-cancel', getLocale('cancel'));

		_hChild.onclick = function (_event) {
			if (_hAddNoteButton.classList.contains('cancel-kZDX5rD5')) {
				removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
				_hAddNoteButton.classList.replace('cancel-kZDX5rD5', 'add-rNC4zfHN');
			} else {

				let _sNoteId = _hChild.getAttribute('note-id');

				if (_sNoteId) {
					_sNoteId = _sNoteId.replace('note-', '');

					getData(false, `noteId${_sNoteId}`, (_response) => {
						_controlNote({
								id: _sNoteId,
								image: _response?.image,
								titles: _response?.titles,
								episodesViewed: _response?.episodesViewed,
								episodes: _response?.episodes,
								seasons: _response?.seasons,
								status: _response?.status,
								viewedStatus: _response?.viewedStatus,
								desc: _response?.desc,
								websites: _response?.websites,
								rating: _response?.rating,
								position: _response?.position
							}
						);
					});

				} else {
					_controlNote();
				}
			}
		};
	});

	function _controlNote(_jNote) {
		_hAddNoteButton.removeAttribute('note-id');

		if (document.getElementsByClassName('content-n5tgZWEy')) {
			_hAddNoteButton.classList.replace('add-rNC4zfHN', 'cancel-kZDX5rD5');
		}

		const _hContent = createDiv(_hBody, '', ['content-n5tgZWEy', 'shadow-pUd54mwX']);

		createLabel(_hContent, '', '', 'imageOptional', 'image-nZsR8KNQ');
		createInput(_hContent, 'image-nZsR8KNQ', '', 'typeSomething', (_hChild) => {
			if (_jNote?.image) _hChild.value = _jNote?.image;
		});

		createLabel(_hContent, '', '', 'titlesOptional', 'titles-NxMNE4ex');
		createInput(_hContent, 'titles-NxMNE4ex', '', 'typeSomething', (_hChild) => {
			if (_jNote?.titles) _hChild.value = _jNote?.titles;
		});

		createLabel(_hContent, '', '', 'episodesViewed', '');
		createDiv(_hContent, '', 'transparent-acQZyy2v', (_hChild) => {
			_hChild.style.display = 'inline-flex';
			createInput(_hChild, 'episodes-viewed-jWKxUqGL', '', 'zero', (_hChild) => {
				_hChild.setAttribute('type', 'number');

				_hChild.onkeyup = function () {
					this.value = this.value.substring(0, 4);
				};

				_hChild.setAttribute('min', '0');
				_hChild.style.width = '100%';
				_hChild.style.textAlign = 'center';

				if (_jNote?.episodesViewed) _hChild.value = _jNote?.episodesViewed;
			});
			createLabel(_hChild, '', '', 'of', '', (_hChild) => {
				_hChild.style.paddingTop = '13px';
				_hChild.style.paddingLeft = '8%';
				_hChild.style.paddingRight = '12%';
			});
			createInput(_hChild, 'episodes-ZpfNGnBG', '', 'zero', (_hChild) => {
				_hChild.setAttribute('type', 'number');
				_hChild.onkeyup = function () {
					this.value = this.value.substring(0, 4);
				};
				_hChild.setAttribute('min', '0');
				_hChild.style.width = '100%';
				_hChild.style.textAlign = 'center';

				if (_jNote?.episodes) _hChild.value = _jNote?.episodes;
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

		createLabel(_hContent, '', '', 'seasons', '');
		createInput(_hContent, 'seasons-AcTuxFRH', '', 'zero', (_hChild) => {
			_hChild.setAttribute('type', 'number');
			_hChild.onkeyup = function () {
				this.value = this.value.substring(0, 4);
			};
			_hChild.setAttribute('min', '0');
			if (_jNote?.seasons) _hChild.value = _jNote?.seasons;
		});

		createLabel(_hContent, '', '', 'status', 'status-FkrUy296');
		const selectStatus = createSelect(_hContent, 'status-FkrUy296', '', 'selectSomething', [
			['related', 'related'],
			['ongoing', 'ongoing'],
			['announce', 'announce']
		]);
		if (_jNote?.status) selectStatus.select(_jNote?.status);

		createLabel(_hContent, '', '', 'statusView', 'status-view-JvJsUY9y');
		const selectViewStatus = createSelect(_hContent, 'status-view-JvJsUY9y', '', 'selectSomething', [
			['unwatched', 'unwatched'],
			['watching', 'watching'],
			['watched', 'watched'],
			['wantWatch', 'wantWatch']
		]);
		if (_jNote?.viewedStatus) selectViewStatus.select(_jNote?.viewedStatus);

		createLabel(_hContent, '', '', 'desc', 'desc-emn6pGAH');
		createTextarea(_hContent, 'desc-emn6pGAH', '', 'typeSomething', (_hChild) => {
			if (_jNote?.desc) _hChild.value = _jNote?.desc;
		});

		createLabel(_hContent, '', '', 'websitesOptional', 'websites-Q3usD5jw');
		createInput(_hContent, 'websites-Q3usD5jw', '', 'typeSomething', (_hChild) => {
			if (_jNote?.websites) _hChild.value = _jNote?.websites;
		});

		createLabel(_hContent, '', '', 'rating', 'rating-CW48Shh3', (_hChild) => {
			_hChild.style.textAlign = 'center';
		});
		const _hRating = createSelectRating(_hContent, 'rating-CW48Shh3', '');
		if (_jNote?.rating) _hRating.select(_jNote?.rating);

		createButton(_hContent, '', 'save-Hj3Cfy9A', 'save', (_hChild) => {
			_hChild.onclick = function () {
				const _sImage = document.getElementById('image-nZsR8KNQ').value;
				const _sTitles = document.getElementById('titles-NxMNE4ex').value;
				if (!_sTitles) return alert(getLocale('requiredTitles'));

				let _sEpisodesViewed = document.getElementById('episodes-viewed-jWKxUqGL').value;
				const _sEpisodes = document.getElementById('episodes-ZpfNGnBG').value;
				const _sSeasons = document.getElementById('seasons-AcTuxFRH').value;
				const _sStatus = document.getElementById('status-FkrUy296').getAttribute('value');
				const _sViewedStatus = document.getElementById('status-view-JvJsUY9y').getAttribute('value');
				if (_sViewedStatus < 1) return alert(getLocale('requiredViewStatus'));

				const _sDesc = document.getElementById('desc-emn6pGAH').value;
				const _sWebsites = document.getElementById('websites-Q3usD5jw').value;
				const _sRating = document.getElementById('rating-CW48Shh3').getAttribute('value');

				getData(false, 'noteIds', (_response) => {
					let _sId = _jNote?.id || genId();

					if (_response) {
						while (_response.includes(_sId) && !_jNote?.id) {
							_sId = genId();
						}
					}

					/* Note adding */
					if (!_jNote?.id) {
						const _aNoteIds = _response || [];
						/* To have the new note on top, unshift and a zero position are used */
						_aNoteIds.unshift(_sId);
						setData(false, 'noteIds', _aNoteIds);
					}

					setData(false, `noteId${_sId}`, {
						image: _sImage.toString(),
						titles: _sTitles.toString(),
						episodesViewed: (_sEpisodesViewed) ? _sEpisodesViewed.toString() : 0,
						episodes: (_sEpisodes) ? _sEpisodes.toString() : 0,
						seasons: (_sSeasons) ? _sSeasons.toString() : 0,
						status: _sStatus.toString(),
						viewedStatus: _sViewedStatus.toString(),
						desc: _sDesc.toString(),
						websites: _sWebsites.toString(),
						rating: _sRating.toString(),
						position: '0'
					});

					setTimeout(_updateNotes, 1000);
					removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
					_hAddNoteButton.classList.replace('cancel-kZDX5rD5', 'add-rNC4zfHN');
				});
			};
		});

		const _bIsError = _jNote?.error || false;
		if (_jNote?.id && !_bIsError) {
			createButton(_hContent, '', 'delete-88jPHdRH', 'delete', (_hChild) => {
				_hChild.onclick = function () {
					getData(false, 'noteIds', (_response) => {
						const _aNoteIds = _response || [];
						/* Note deleting */
						if (_aNoteIds.indexOf(_jNote?.id) > 0) _aNoteIds.splice(_aNoteIds.indexOf(_jNote?.id), 1);

						setData(false, 'noteIds', _aNoteIds);
						setData(false, `noteId${_jNote?.id}`, null);

						setTimeout(_updateNotes, 1000);
						removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
						_hAddNoteButton.classList.replace('cancel-kZDX5rD5', 'add-rNC4zfHN');
					});
				};
			});
		}
	}

	function _updateNotes() {
		/* Getting the scroll bar position to save and setting the same one after displaying */
		const _nScrollPos = _hBody.scrollTop;

		/* Removing old notes */
		removeElement('notes-MfRGWNqC');

		/* An array that will store the finished divs, for later display */
		const _NotesReady = new Map();
		const _NotesPage = new Set();

		getData(false, 'noteIds', (_nIds) => {
			if (_nIds) {
				/* Removing the notification about missing notes */
				removeClassElements('label-jFU6wwNV');

				/* The quantity is duplicated in a variable to avoid duplicates in the loop */
				const _nNotesCount = _nIds.length;
				_continueUpdateNotes();

				function _continueUpdateNotes() {
					for (const _jId of _nIds) {
						if (_nIds.length < _nNotesCount) break;

						/* Creating fake notes */
						if (!document.getElementById('load-label-F7rZvMz2')) {
							createLabel(_hNotes, 'load-label-F7rZvMz2', 'label-SSrq6Djx', 'loadings');
						}

						if (!document.getElementById(`load-${_jId}`)) {
							createDiv(_hNotes, `load-${_jId}`, 'load-PMb84E8y', (_hNote) => {
								createMargin(_hNote, 'embed');
								createDiv(_hNote, '', 'image-GQtx92fM');
								createMargin(_hNote, 'embed');
								createDiv(_hNote, '', 'title-3Wgg5PKh');
								createMargin(_hNote, 'embed');
								createDiv(_hNote, '', 'desc-W3cU2ueU');
								createMargin(_hNote, 'embed');
							});
						}

						/* Creating real notes */
						getData(false, `noteId${_jId}`, (_jNote) => {
							try {
								/* The object is accessed directly, without an existence check, to handle the error in the catch block.  */
								const _sTitles = _jNote?.titles;
								const _sImage = _jNote?.image;
								const _sEpisodesViewed = _jNote?.episodesViewed;
								const _sEpisodes = _jNote?.episodes;
								const _sSeasons = _jNote?.seasons;
								const _sStatus = _jNote?.status;
								const _sViewedStatus = _jNote?.viewedStatus;
								const _sDesc = _jNote?.desc;
								const _sWebsites = _jNote?.websites;
								const _sRating = _jNote?.rating;
								let _sPosition = _jNote?.position;

								/* Sorting positions */
								while (_NotesReady.has(_sPosition.toString())) {
									_sPosition++;
								}

								/* Notes are first created and stacked in Map, for later display */
								_NotesReady.set(_sPosition.toString(), _createNote(false));

								/* Variable with id shortcut */
								let _sPageTitleId = '';

								/* Create shortcuts if the page has the same serial name as the note */
								const _aTitles = _sTitles.split(', ');
								for (const _sTitle of _aTitles) {
									if (aSerialTitles.toString().includes(_sTitle)) {
										const _aPageTitles = document.getElementsByClassName(SHORTCUT_CLASS);
										for (const _hPageTitle of _aPageTitles) {
											if (_hPageTitle.innerText.includes(_sTitle)) {
												if (_hPageTitle.id) {
													_sPageTitleId = _hPageTitle.id;
												} else {
													_hPageTitle.id = `shortcut-keeper-${_jId}`;
													_sPageTitleId = _hPageTitle.id;
												}
											}
										}

										_NotesPage.add(_createNote(true));
										break;
									}
								}

								/* Limited - means that the note is a label rather than a full-fledged */
								function _createNote(_bLimited) {
									return createDiv(null, '', '', (_hNote) => {
										if (!_bLimited) {
											_hNote.id = `note-${_jId}`;
											_hNote.classList.add('note-PgjFjRUS');

											/* A note is given a special attribute to speed up its position */
											_hNote.setAttribute('position', _sPosition.toString());

											/* Enabling note drag and drop */
											_hNote.tabIndex = 0;
											_hNote.draggable = true;
										} else {
											_hNote.classList.add('limited-2DysF6H8');
										}

										sendLog('ggs4xgWMfbZYBpfK', LOG_TYPES.LOG, {ggs4xgWMfbZYBpfK: _nIds});
										sendLog('Uj46Tcr3xr4dN9L7', LOG_TYPES.LOG, {note: {
												id: _jId,
												title: _sTitles,
												image: _sImage,
												episodesViewed: _sEpisodesViewed,
												episodes: _sEpisodes,
												seasons: _sSeasons,
												status: _sStatus,
												viewedStatus: _sViewedStatus,
												desc: _sDesc,
												websites: _sWebsites,
												rating: _sRating,
												position: _sPosition
											}
										});

										/* Note design */
										if (_sViewedStatus && !_bLimited) {
											createLabel(_hNote, '',
												['status-viewed-3mPKGu4U', STATUSES.get(_sViewedStatus)], _sViewedStatus
											);
										}

										if (_sStatus && !_bLimited) {
											createLabel(_hNote, '', 'status-5cBUD2rC', _sStatus);
										}

										if (_sImage && !_bLimited) {
											createMargin(_hNote, 'embed', 'other-WUg8SV9z');
											createImg(_hNote, '', 'image-2gZc3pYt', _sImage, 'errorLoading');
										}

										if (_sTitles) {
											createMargin(_hNote, 'embed', 'other-WUg8SV9z');
											createLabel(_hNote, '', 'title-A5xU6DER', `${
												_sTitles.toString().split(', ')[0]
											}`, '', (_hChild) => {
												if (_bLimited) _hChild.style.width = '100%';
											});
										}

										/* Creating shortcuts to quickly navigate to elements */
										if (_bLimited) {
											createMargin(_hNote, 'short', 'other-WUg8SV9z');
											createDiv(_hNote, '', 'buttons-6dt3Ne7p', (_hChild) => {
												createLink(_hChild, '', '', 'goTo', `#${_sPageTitleId}`);
												createLink(_hChild, '', '', 'moreInfo', `#note-${_jId}`);
											});
										}

										if (_sRating && !_bLimited) {
											createDiv(_hNote, '', 'rating-J9RU4MjX', (_hChild) => {
												/* Rating stars display, the number from the database is colored as selected, the other stars remain normal */
												for (let _nStarts = 1; _nStarts <= parseInt(_sRating); _nStarts++) {
													const _hSpan = document.createElement('span');
													_hChild.append(_hSpan);
													_hSpan.classList.add('fa', 'fa-star', 'checked-cFXHwS3x', 'other-WUg8SV9z');
												}

												for (let _nStarts = 1; _nStarts <= 5 - parseInt(_sRating); _nStarts++) {
													const _hSpan = document.createElement('span');
													_hChild.append(_hSpan);
													_hSpan.classList.add('fa', 'fa-star', 'other-WUg8SV9z');
												}
											});
										}

										if (_sDesc && !_bLimited) {
											createMargin(_hNote, 'short', 'other-WUg8SV9z');
											createLabel(_hNote, '', 'desc-DtYkVa9G', _sDesc);
										}

										if (_sWebsites && !_bLimited) {
											createMargin(_hNote, 'embed', 'other-WUg8SV9z');
											createDiv(_hNote, '', 'websites-DtYkVa9G', (_hChild) => {
												for (const _sLink of _sWebsites.split(', ')) {
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

										if (_sEpisodesViewed && _sEpisodes && !_bLimited) {
											createMargin(_hNote, 'embed', 'other-WUg8SV9z');
											createDiv(_hNote, '', 'episodes-y6qHgvQw', (_hChild) => {
												createDiv(_hChild, '', '', (_hChild) => {
													/* Because of the peculiar system, the information is not in one line, but several labels */
													createLabel(_hChild, '', 'other-WUg8SV9z', 'episodes');
													createLabel(_hChild, '', 'other-WUg8SV9z', _sEpisodesViewed);
													createLabel(_hChild, '', 'other-WUg8SV9z', 'of');

													if (_sSeasons && parseInt(_sSeasons) > 0) {
														createLabel(_hChild, '', 'other-WUg8SV9z', `${_sEpisodes},`);
														createLabel(_hChild, '', 'other-WUg8SV9z', 'seasons');
														createLabel(_hChild, '', 'other-WUg8SV9z', _sSeasons);
													} else {
														createLabel(_hChild, '', 'other-WUg8SV9z', `${_sEpisodes}`);
													}
												});
												createMargin(_hChild, 'default', 'other-WUg8SV9z');

												/* Values must be greater than zero, and the episodes viewed cannot be greater than the episodes in the show */
												if (parseInt(_sEpisodes) > 0 && parseInt(_sEpisodesViewed) > 0 && parseInt(_sEpisodes) >= parseInt(_sEpisodesViewed)) {
													/* The width of the progress bar is the percentage of all episodes watched */
													const _nProgress = Math.round((parseInt(_sEpisodesViewed) * 100 / parseInt(_sEpisodes))).toString();
													createDiv(_hChild, '', 'progress-Vdx7xbRM', (_hChild) => {
														_hChild.style.width = `${_nProgress}%`;
													});
												}
											});
										} else {
											/* Since the block is a closing block, if it is not, its indentation must be in any case */
											createMargin(_hNote, 'embed', 'other-WUg8SV9z');
										}

										if (!_bLimited) {
											/* Tabindex did not work, so the focus is set by clicking on the note */
											_hNote.onclick = function (_event) {
												_hNote.focus();
											};

											/* Note movement system */
											/* When a note is dragged, its identifier is saved in the data, so you can swap notes later */
											_hNote.ondragstart = function (_event) {
												_event.dataTransfer.setData('note', _event.target.id.toString());
												document.getElementById(_event.target.id).focus();
											};

											_hNote.ondrop = function (_event) {
												_event.preventDefault();

												const _jSwitchedOnId = _event.dataTransfer.getData('note').replace('note-', '');

												/* Changing positions */
												getData(false, `noteId${_jSwitchedOnId}`, (_jSwitchedAtNote) => {
													if (_jSwitchedAtNote && _jSwitchedOnId !== _jId) {
														document.getElementById(`note-${_jId}`).classList.add('on-drop-x4YnDmpC');

														let _jSwitchedAt = _jNote;

														_jSwitchedAt.position = document.getElementById(`note-${_jSwitchedOnId}`)
														.getAttribute('position') || 0;
														setData(false, `noteId${_jId}`, _jSwitchedAt);

														let _jSwitchedOn = _jSwitchedAtNote;
														_jSwitchedOn.position = _sPosition;
														setData(false, `notedId${_jSwitchedOnId}`, _jSwitchedOn);

														setTimeout(_updateNotes, 1000);
														}
													});
											};

											_hNote.ondragover = function (_event) {
												_event.preventDefault();
											};

											/* Setting the note id for the editing system */
											_hNote.onfocus = function (_event) {
												_hAddNoteButton.classList.replace('add-rNC4zfHN', 'edit-Kv4fCGXg');
												_hAddNoteButton.setAttribute('note-id', _event.target.id);
											};

											/* Deleting a note id from the editing system */
											_hNote.onblur = function (_event) {
												_hAddNoteButton.classList.replace('edit-Kv4fCGXg', 'add-rNC4zfHN');

												setTimeout(_removeAttribute, 5000);

													function _removeAttribute() {
														_hAddNoteButton.removeAttribute('note-id');
													}
											};

											/* It is easier for me to say in general that it is a system, because there are also comments on its elements, and I do not want to duplicate */
										}
									});
								}

								if (_nIds.length === _NotesReady.size) {
									sendLog('G98yhVDYxDZEc72z', LOG_TYPES.LOG, {
										divsNote: _NotesReady
									});

									/* Adding note shortcuts, if any */
									if (_NotesPage.size > 0) {
										createLabel(_hNotes, '', 'label-SSrq6Djx', 'notesOnPage');

										for (const _hNote of _NotesPage) {
											if (_hNote) _hNotes.append(_hNote);
										}
									}

									createLabel(_hNotes, '', 'label-SSrq6Djx', 'notesAll');

									/* Since sorting does not set the order, the notes do not go one after the other, you can get positions 3 and 6, so the for loop will not work */
									let _nIndex = 0;
									while (_NotesReady.size > 0) {
										if (_NotesReady.has(_nIndex.toString())) {
											const _hDiv = _NotesReady.get(_nIndex.toString());
											if (_hDiv) _hNotes.append(_hDiv);
											_NotesReady.delete(_nIndex.toString());
										}
										_nIndex++;
									}

									if (_nScrollPos) _hBody.scrollTop = _nScrollPos;
								}
							} catch (_e) {
								/* Note removal system for 3 errors at a time */
								if (_nIds && _jId) {
									_nIds.splice(_nIds.indexOf(_jId), 1);

									document.getElementById('load-label-F7rZvMz2').style.display = 'inherit';

									/* Changing a fake note into a note with an error */
									const _hNote = document.getElementById(`load-${_jId}`);
									_hNote.innerHTML = '';
									_hNote.classList.replace('load-PMb84E8y', 'error-PTbkZ3J8');
									createDiv(_hNote, '', '', (_hChild) => {
										createLabel(_hChild, '', 'title-pJ2WhhWd', 'errorLoading');
										createMargin(_hChild, 'short');
										createLabel(_hChild, '', '', 'note');
										createLabel(_hChild, '', '', ':');
										createLabel(_hChild, '', 'id-f8YW3fne', `${_jId}`);
										createMargin(_hChild, 'embed');

										/* The stack, etc., is specified for details, but different browsers have different calls */
										let _error = _e.stack || _e.line || _e.lineNumber;
										createLabel(_hChild, '', 'label-ypPZP2fz', `${_error}`);
										createMargin(_hChild, 'embed');

										/* Div with Buttons */
										createDiv(_hChild, '', 'buttons-6dt3Ne7p', (_hChild) => {
											/* Note deletion button */
											createLabel(_hChild, '', '', 'delete', '', (_hChild) => {
												_hChild.onclick = function (_event) {
													getData(false, 'noteIds', (_response) => {
														_response.splice(_response.indexOf(_jId), 1);
														setData(false, 'noteIds', _response);
														setData(false, `noteId${_jId}`, null);
														setTimeout(_updateNotes, 1000);
													});
												};
											});

											/* In the create note menu, the existing parameters of the broken note are transferred */
											getData(false, `noteId${_jId}`, (_note) => {

												if (_note) {
													createLabel(_hChild, '', '', 'reCreate', '', (_hChild) => {
														_hChild.onclick = function (_event) {
															_note.id = _jId;
															_note.error = true;
															/* Update the list of notes by pressing the save button in the menu */
															_controlNote(_note);
															setData(false, `noteId${_jId}`, null);
														};
													});
												}
											});

										});
									});

									_continueUpdateNotes();
								}

								sendLog('RAxm3R7HH3cYxj6q', LOG_TYPES.ERR, {RAxm3R7HH3cYxj6q: _e});
							} finally {
								if (_nIds.length <= _nNotesCount) {
									/* Removing fake notes */
									removeClassElements('load-PMb84E8y', 'removed-UEg2H5Ps');
								}
							}
						});


					}
				}
			}
		});

		/* Notification about missing notes */
		createLabel(_hNotes, '', 'label-jFU6wwNV', 'notesAll');
		createLabel(_hNotes, '', 'label-jFU6wwNV', 'missingNotes');
	}
}