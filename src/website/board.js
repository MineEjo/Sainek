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

/* Moved out, for changes in other scripts */
let hBoard = undefined;
const sNoteId = 'noteId';
const sNotesId = 'noteIds';

function loadBoard() {
	hBoard = createDiv(document.body, '', ['board-uVL3djCA', 'shadow-pUd54mwX']);
	
	addContextListener(hBoard);
	
	const _hBody = createDiv(hBoard, '', 'body-3y53QZt3');
	const _hNotes = createDiv(_hBody, 'notes-MfRGWNqC', '');
	
	_updateNotes();
	
	const _hAddNoteButton = createButton(_hBody, '', [
		'buttons-cH9xa8qr', 'shadow-pUd54mwX', 'add-rNC4zfHN'
	], '', (_hChild) => {
		_hChild.setAttribute('locale-edit', getLocale('edit'));
		_hChild.setAttribute('locale-add', getLocale('add'));
		_hChild.setAttribute('locale-cancel', getLocale('cancel'));
		
		_hChild.onclick = (_event) => {
			if (_hAddNoteButton.classList.contains('cancel-kZDX5rD5')) {
				removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
				_hAddNoteButton.classList.replace('cancel-kZDX5rD5', 'add-rNC4zfHN');
			} else {
				
				let _sId = _hChild.getAttribute('note-id');
				
				if (_sId) {
					_sId = _sId.replace('note-', '');
					
					getData(false, `${sNoteId}${_sId}`, (_response) => {
						_controlNote({
								id: _sId,
								image: _response?.image,
								titles: _response?.titles,
								episodesViewed: _response?.episodesViewed,
								episodes: _response?.episodes,
								seasonsViewed: _response?.seasonsViewed,
								seasons: _response?.seasons,
								status: _response?.status,
								desc: _response?.desc,
								rating: _response?.rating,
								dateCreation: _response?.dateCreation,
								dateModification: _response?.dateModification,
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
		
		const _hContent = createForm(_hBody, '', ['content-n5tgZWEy', 'shadow-pUd54mwX']);
		
		createLabel(_hContent, '', '', 'imageOptional', 'image-nZsR8KNQ');
		createInput(_hContent, 'image-nZsR8KNQ', '', 'typeSomething', (_hChild) => {
			if (_jNote?.image) _hChild.value = _jNote?.image;
		});
		
		createLabel(_hContent, '', '', 'titlesOptional', 'titles-NxMNE4ex');
		createInput(_hContent, 'titles-NxMNE4ex', '', 'typeSomething', (_hChild) => {
			if (_jNote?.titles) _hChild.value = _jNote?.titles;
			_hChild.required = true;
		});
		
		createLabel(_hContent, '', '', 'episodesViewed', '');
		createDiv(_hContent, '', '', (_hChild) => {
			_hChild.style.display = 'inline-flex';
			createInput(_hChild, 'episodes-viewed-jWKxUqGL', '', 'zero', (_hChild) => {
				_hChild.setAttribute('type', 'number');
				_hChild.setLength(4);
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
				_hChild.setLength(4);
				_hChild.setAttribute('min', '0');
				_hChild.style.width = '100%';
				_hChild.style.textAlign = 'center';
				_hChild.style.marginTop = 'var(--short-margin-xqv9MGJg)';
				
				if (_jNote?.episodes) _hChild.value = _jNote?.episodes;
			});
		});
		
		createLabel(_hContent, '', '', 'seasonsViewed', '');
		createDiv(_hContent, '', '', (_hChild) => {
			_hChild.style.display = 'inline-flex';
			createInput(_hChild, 'seasons-viewed-T8ufBECf', '', 'zero', (_hChild) => {
				_hChild.setAttribute('type', 'number');
				_hChild.setLength(4);
				_hChild.setAttribute('min', '0');
				_hChild.style.width = '100%';
				_hChild.style.textAlign = 'center';
				
				if (_jNote?.seasonsViewed) _hChild.value = _jNote?.seasonsViewed;
			});
			createLabel(_hChild, '', '', 'of', '', (_hChild) => {
				_hChild.style.paddingTop = '13px';
				_hChild.style.paddingLeft = '8%';
				_hChild.style.paddingRight = '12%';
			});
			createInput(_hChild, 'seasons-AcTuxFRH', '', 'zero', (_hChild) => {
				_hChild.setAttribute('type', 'number');
				_hChild.setAttribute('min', '0');
				_hChild.setLength(4);
				_hChild.style.width = '100%';
				_hChild.style.textAlign = 'center';
				_hChild.style.marginTop = 'var(--short-margin-xqv9MGJg)';
				
				if (_jNote?.seasons) _hChild.value = _jNote?.seasons;
			});
		});
		
		createLabel(_hContent, '', '', 'status', 'status-FkrUy296');
		createSelect(_hContent, 'status-FkrUy296', '', 'selectSomething', [
			['out', 'out'],
			['ongoing', 'ongoing'],
			['abandoned', 'abandoned']
		], (_hChild) => {
			if (_jNote?.status) _hChild.select(_jNote?.status);
			_hChild.required(true);
		});
		
		createLabel(_hContent, '', '', 'desc', 'desc-emn6pGAH');
		createTextarea(_hContent, 'desc-emn6pGAH', '', 'typeSomething', (_hChild) => {
			if (_jNote?.desc) _hChild.value = _jNote?.desc;
		});
		
		createLabel(_hContent, '', '', 'rating', 'rating-CW48Shh3', (_hChild) => {
			_hChild.style.textAlign = 'center';
		});
		createSelectRating(_hContent, 'rating-CW48Shh3', '', (_hChild) => {
			if (_jNote?.rating) _hChild.select(_jNote?.rating);
		});
		
		createButton(_hContent, '', ['save-Hj3Cfy9A', 'buttons-wFwU4Bhn'], 'save', (_hChild) => {
			_hChild.onclick = () => {
				const _sImage = document.getElementById('image-nZsR8KNQ').value;
				const _sTitles = document.getElementById('titles-NxMNE4ex').value;
				
				const _sEpisodesViewed = document.getElementById('episodes-viewed-jWKxUqGL').value || 0;
				const _sEpisodes = document.getElementById('episodes-ZpfNGnBG').value || 0;
				const _sSeasonsViewed = document.getElementById('seasons-viewed-T8ufBECf').value || 0;
				const _sSeasons = document.getElementById('seasons-AcTuxFRH').value || 0;
				const _sStatus = document.getElementById('status-FkrUy296').getAttribute('value');
				
				const _sDesc = document.getElementById('desc-emn6pGAH').value;
				const _sRating = document.getElementById('rating-CW48Shh3').getAttribute('value');
				
				const _aOldData = _jNote?.image + _jNote?.titles + _jNote?.episodesViewed + _jNote?.episodes +
					_jNote?.seasonsViewed + _jNote?.seasons + _jNote?.status + _jNote?.desc + _jNote?.rating;
				
				const _aNewData = _sImage + _sTitles + _sEpisodesViewed + _sEpisodes + _sSeasonsViewed + _sSeasons +
					_sStatus + _sDesc + _sRating;
				
				if (_sTitles && _sStatus) {
					getData(false, sNotesId, (_response) => {
						if (_aOldData !== _aNewData) {
							let _sId = _jNote?.id || genId();
							
							if (_response) while (_response.includes(_sId) && !_jNote?.id) _sId = genId();
							
							/* Note adding */
							if (!_jNote?.id) {
								const _aIds = _response || [];
								/* To have the new note on top, unshift and a zero position are used */
								_aIds.unshift(_sId);
								setData(false, sNotesId, _aIds);
							}
							
							const _dDate = new Date().getTime();
							setData(false, `${sNoteId}${_sId}`, {
								image: _sImage.toString(),
								titles: _sTitles.toString(),
								episodesViewed: (_sEpisodesViewed) ? _sEpisodesViewed.toString() : 0,
								episodes: (_sEpisodes) ? _sEpisodes.toString() : 0,
								seasonsViewed: (_sSeasonsViewed) ? _sSeasonsViewed.toString() : 0,
								seasons: (_sSeasons) ? _sSeasons.toString() : 0,
								status: _sStatus.toString(),
								desc: _sDesc.toString(),
								rating: _sRating.toString(),
								dateCreation: (_jNote?.dateCreation) ? _jNote?.dateCreation : _dDate,
								dateModification: (_jNote?.dateCreation) ? _dDate : null,
								position: '0'
							}, () => {
								_updateNotes();
							});
						}
						
						removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
						_hAddNoteButton.classList.replace('cancel-kZDX5rD5', 'add-rNC4zfHN');
					});
				}
			};
		});
		
		const _bIsError = _jNote?.error || false;
		if (_jNote?.id && !_bIsError) {
			createButton(_hContent, '', ['delete-88jPHdRH', 'buttons-wFwU4Bhn'], 'delete', (_hChild) => {
				_hChild.onclick = () => {
					getData(false, sNotesId, (_response) => {
						const _aIds = _response || [];
						/* Note deleting */
						if (_aIds.indexOf(_jNote?.id) > -1) {
							_aIds.splice(_aIds.indexOf(_jNote?.id), 1);
						}
						
						setData(false, sNotesId, _aIds);
						setData(false, `${sNoteId}${_jNote?.id}`, null, () => {
							_updateNotes();
						});
						
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
		
		getData(false, sNotesId, (_nIds) => {
			if (_nIds && _nIds.length > 0) {
				/* Removing the notification about absence notes */
				removeClassElements('label-jFU6wwNV');
				
				/* The quantity is duplicated in a variable to avoid duplicates in the loop */
				const _nNotesCount = _nIds.length;
				let _nSorted = 0;
				_continueUpdateNotes();
				
				function _continueUpdateNotes() {
					for (const _jId of _nIds) {
						if (_nIds.length < _nNotesCount) break;
						
						/* Creating fake notes */
						if (!document.getElementById('load-label-F7rZvMz2')) {
							createLabel(_hNotes, 'load-label-F7rZvMz2', 'label-SSrq6Djx', 'loadings');
						}
						
						if (!document.getElementById(`load-${_jId}`)) {
							createDiv(_hNotes, `load-${_jId}`, ['load-PMb84E8y', 'shadow-pUd54mwX'], (_hNote) => {
								createDiv(_hNote, '', 'image-GQtx92fM');
								createMargin(_hNote, CSS.MARGIN.EMBED);
								createDiv(_hNote, '', 'title-3Wgg5PKh');
								createMargin(_hNote, CSS.MARGIN.EMBED);
								createDiv(_hNote, '', 'desc-W3cU2ueU');
								createMargin(_hNote, CSS.MARGIN.EMBED);
							});
						}
						
						/* Creating real notes */
						getData(false, `${sNoteId}${_jId}`, (_jNote) => {
							try {
								/* The object is accessed directly, without an existence check, to handle the error in the catch block.  */
								const _sTitles = _jNote?.titles;
								const _sImage = _jNote?.image;
								const _sEpisodesViewed = _jNote?.episodesViewed;
								const _sEpisodes = _jNote?.episodes;
								const _sSeasonsViewed = _jNote?.seasonsViewed;
								const _sSeasons = _jNote?.seasons;
								const _sStatus = _jNote?.status;
								const _sDesc = _jNote?.desc;
								const _sDateCreation = _jNote?.dateCreation;
								const _sDateModification = _jNote?.dateModification;
								const _sRating = _jNote?.rating;
								let _sPosition = _jNote?.position;
								
								/* Error handling */
								if (!_jNote) throw `${getLocale('noteNoteFound')} - (${_jId})`;
								if (!_jNote?.position) throw `${getLocale('noteMissingPosition')} - (${_jId})`;
								if (!_jNote?.titles) throw `${getLocale('noteMissingTitle')} - (${_jId})`;
								
								_nSorted++;
								
								/* Sorting positions */
								while (_NotesReady.has(_sPosition.toString())) _sPosition++;
								
								/* Notes are first created and stacked in Map, for later display */
								_NotesReady.set(_sPosition.toString(), _createNote(false));
								
								/* Variable with id shortcut */
								let _sPageTitleId = '';
								
								/* Create shortcuts if the page has the same serial name as the note */
								const _aTitles = _sTitles.split(', ');
								for (const _sTitle of _aTitles) {
									if (aSerialTitles.toString().toUpperCase().includes(_sTitle.toUpperCase())) {
										const _aPageTitles = document.getElementsByClassName(CSS.CLASS.SHORTCUT);
										for (const _hPageTitle of _aPageTitles) {
											if (_hPageTitle.innerText.includes(_sTitle)) {
												if (_hPageTitle.id) {
													_sPageTitleId = _hPageTitle.id;
												} else {
													_hPageTitle.id = `shortcut-${_jId}`;
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
									return createDiv(null, '', 'shadow-pUd54mwX', (_hNote) => {
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
										
										consoleSend(CONSOLE.LOG, _nIds);
										consoleSend(CONSOLE.LOG, {
											id: _jId,
											title: _sTitles,
											image: _sImage,
											episodesViewed: _sEpisodesViewed,
											episodes: _sEpisodes,
											seasonsViewed: _sSeasonsViewed,
											seasons: _sSeasons,
											status: _sStatus,
											desc: _sDesc,
											rating: _sRating,
											dateCreation: _sDateCreation,
											dateModification: _sDateModification,
											position: _sPosition
										});
										
										/* Note design */
										if (_sImage && !_bLimited) {
											createImg(_hNote, '', 'image-2gZc3pYt', _sImage, 'errorLoading', (_hChild) => {
												observer.observe(_hChild);
											});
										}
										
										if (_sTitles) {
											createMargin(_hNote, CSS.MARGIN.DEFAULT);
											createLabel(_hNote, '', 'title-A5xU6DER', `${
												_sTitles.toString().split(', ')[0]
											}`, '', (_hChild) => {
												if (_bLimited) {
													_hChild.style.width = '100%';
												}
											});
										}
										
										/* Creating shortcuts to quickly navigate to elements */
										if (_bLimited) {
											createMargin(_hNote, CSS.MARGIN.SHORT);
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
													_hSpan.classList.add('fa', 'fa-star', 'checked-cFXHwS3x');
												}
												
												for (let _nStarts = 1; _nStarts <= 5 - parseInt(_sRating); _nStarts++) {
													const _hSpan = document.createElement('span');
													_hChild.append(_hSpan);
													_hSpan.classList.add('fa', 'fa-star');
												}
											});
										}
										
										if ((_sStatus || _sEpisodes || _sSeasons) && !_bLimited) {
											createMargin(_hNote, CSS.MARGIN.SHORT);
											createDiv(_hNote, '', [
												'status-y6qHgvQw', 'highlight-BrzYF9mU'
											], (_hChild) => {
												if (_sStatus) {
													const _sCharacter = (_sEpisodes) ? ':' : '';
													createLabel(_hChild, '', '', `==${_sStatus}==${_sCharacter}`);
												}
												
												const _aDeclensions = [
													getLocale(`declensions[1]`), getLocale('declensions[2]')
												];
												if (_sEpisodes && parseInt(_sEpisodes) > 0) {
													const _sDeclension = getDeclension(_sEpisodes, [
														'', _aDeclensions[0], _aDeclensions[1]
													]);
													createLabel(_hChild, '', '', `${_sEpisodes} ==episode==${_sDeclension}`);
												}
												
												if (_sSeasons && parseInt(_sSeasons) > 0) {
													createLabel(_hChild, '', '', `and`);
													const _sDeclension = getDeclension(_sSeasons, [
														'', _aDeclensions[0], _aDeclensions[1]
													]);
													createLabel(_hChild, '', '', `${_sSeasons} ==season==${_sDeclension}`);
												}
											});
										}
										
										if ((_sEpisodesViewed || _sSeasonsViewed) && !_bLimited) {
											createMargin(_hNote, CSS.MARGIN.SHORT, '');
											createDiv(_hNote, '', [
												'status-view-fvvJSM2d', 'highlight-BrzYF9mU'
											], (_hChild) => {
												/* Values must be greater than zero, and the episodes viewed cannot be greater than the episodes in the show */
												if (parseInt(_sEpisodes) > 0 &&
													parseInt(_sEpisodesViewed) > 0 &&
													parseInt(_sEpisodes) >= parseInt(_sEpisodesViewed)) {
													/* The width of the progress bar is the percentage of all episodes watched */
													const _nProgress = Math.round((parseInt(_sEpisodesViewed) * 100 / parseInt(_sEpisodes))).toString();
													createDiv(_hChild, '', ['progress-Vdx7xbRM'], (_hChild) => {
														_hChild.style.width = `${_nProgress}%`;
													});
												}
												
												createLabel(_hChild, '', '', `==watched==:`);
												
												const _aDeclensions = [
													getLocale(`declensions[1]`), getLocale('declensions[2]')
												];
												if (_sEpisodesViewed && parseInt(_sEpisodesViewed) > 0) {
													const _sDeclension = getDeclension(_sEpisodesViewed, [
														'', _aDeclensions[0], _aDeclensions[1]
													]);
													createLabel(_hChild, '', '', `${_sEpisodesViewed} ==episode==${_sDeclension}`);
												}
												
												if (_sSeasonsViewed && parseInt(_sSeasonsViewed) > 0) {
													createLabel(_hChild, '', '', `and`);
													const _sDeclension = getDeclension(_sSeasonsViewed, [
														'', _aDeclensions[0], _aDeclensions[1]
													]);
													createLabel(_hChild, '', '', `${_sSeasonsViewed} ==season==${_sDeclension}`);
												}
											});
										}
										
										if (_sDesc && !_bLimited) {
											createMargin(_hNote, CSS.MARGIN.DEFAULT);
											createDiv(_hNote, '', 'desc-DtYkVa9G', (_hChild) => {
												createLabel(_hChild, '', 'text-UqaNp8Pk', _sDesc);
												/* For customization and smooth animation, do not use the CSS property 'white-space: nowrap' */
												createLabel(_hChild, '', [
													'ellipsis-qk5FvLnk', 'highlight-BrzYF9mU'
												], '...');
											});
										}
										
										if ((_sDateCreation || _sDateModification) && !_bLimited) {
											createMargin(_hNote, CSS.MARGIN.EMBED, 'hidden-pY7ppa4q');
											
											if (_sDateCreation) {
												createLabel(_hNote, '', 'date-aKYEac4h', `==created==: ${getFormattedDate(_sDateCreation)}`);
											}
											
											if (_sDateModification) {
												createLabel(_hNote, '', 'date-aKYEac4h', `==modified==: ${getFormattedDate(_sDateModification)}`);
											}
										}
										
										createMargin(_hNote, CSS.MARGIN.EMBED);
										
										if (!_bLimited) {
											/* Tabindex did not work, so the focus is set by clicking on the note */
											_hNote.onclick = (_event) => {
												_hNote.focus();
											};
											
											/* Note movement system */
											/* When a note is dragged, its identifier is saved in the data, so you can swap notes later */
											_hNote.ondragstart = (_event) => {
												_event.dataTransfer.setData('note', _event.target.id.toString());
												document.getElementById(_event.target.id).focus();
											};
											
											_hNote.ondrop = (_event) => {
												_event.preventDefault();
												
												const _jSwitchedOnId = _event.dataTransfer.getData('note').replace('note-', '');
												
												/* Changing positions */
												getData(false, `${sNoteId}${_jSwitchedOnId}`, (_jSwitchedAtNote) => {
													if (_jSwitchedAtNote && _jSwitchedOnId !== _jId) {
														document.getElementById(`note-${_jId}`).classList.add('on-drop-x4YnDmpC');
														
														let _jSwitchedAt = _jNote;
														
														_jSwitchedAt.position = document.getElementById(`note-${_jSwitchedOnId}`).getAttribute('position') || 0;
														setData(false, `${sNoteId}${_jId}`, _jSwitchedAt);
														
														let _jSwitchedOn = _jSwitchedAtNote;
														_jSwitchedOn.position = _sPosition;
														setData(false, `${sNoteId}${_jSwitchedOnId}`, _jSwitchedOn, () => {
															_updateNotes();
														});
													}
												});
											};
											
											_hNote.ondragover = (_event) => {
												_event.preventDefault();
											};
											
											/* Setting the note id for the editing system */
											_hNote.onfocus = (_event) => {
												removeClassElements('content-n5tgZWEy', 'removed-UEg2H5Ps');
												_hAddNoteButton.classList.replace('cancel-kZDX5rD5', 'edit-Kv4fCGXg');
												_hAddNoteButton.classList.replace('add-rNC4zfHN', 'edit-Kv4fCGXg');
												_hAddNoteButton.setAttribute('note-id', _event.target.id);
											};
											
											/* Deleting a note id from the editing system */
											_hNote.onblur = (_event) => {
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
							} catch (_e) {
								/* Note removal system for 3 errors at a time */
								if (_nIds && _jId) {
									_nIds.splice(_nIds.indexOf(_jId), 1);
									
									const _hLoadLabel = document.getElementById('load-label-F7rZvMz2');
									if (_hLoadLabel) _hLoadLabel.style.display = 'inherit';
									
									/* Changing a fake note into a note with an error */
									const _hNote = document.getElementById(`load-${_jId}`);
									
									if (!_hNote) return;
									
									_hNote.innerHTML = '';
									_hNote.classList.replace('load-PMb84E8y', 'error-PTbkZ3J8');
									createDiv(_hNote, '', '', (_hChild) => {
										createLabel(_hChild, '', 'title-pJ2WhhWd', 'errorLoading');
										createMargin(_hChild, CSS.MARGIN.SHORT);
										createLabel(_hChild, '', '', 'note');
										createLabel(_hChild, '', '', ':');
										createLabel(_hChild, '', ['id-f8YW3fne', 'highlight-BrzYF9mU'], `${_jId}`);
										createMargin(_hChild, CSS.MARGIN.SHORT);
										
										/* The stack, etc., is specified for details, but different browsers have different calls */
										let _error = _e.stack || _e.line || _e.lineNumber || _e;
										createLabel(_hChild, '', ['label-ypPZP2fz', 'highlight-BrzYF9mU'], `${_error}`);
										createMargin(_hChild, CSS.MARGIN.SHORT);
										
										/* Div with Buttons */
										createDiv(_hChild, '', ['buttons-6dt3Ne7p'], (_hChild) => {
											/* Note deletion button */
											createLabel(_hChild, '', '', 'delete', '', (_hChild) => {
												_hChild.onclick = (_event) => {
													getData(false, sNotesId, (_response) => {
														_response.splice(_response.indexOf(_jId), 1);
														setData(false, sNotesId, _response);
														setData(false, `${sNoteId}${_jId}`, null, () => {
															_updateNotes();
														});
													});
												};
											});
											
											/* In the create note menu, the existing parameters of the broken note are transferred */
											getData(false, `${sNoteId}${_jId}`, (_note) => {
												if (_note) {
													createLabel(_hChild, '', '', 'reCreate', '', (_hChild) => {
														_hChild.onclick = (_event) => {
															_note.id = _jId;
															_note.error = true;
															/* Update the list of notes by pressing the save button in the menu */
															_controlNote(_note);
															setData(false, `${sNoteId}${_jId}`, null);
														};
													});
												}
											});
											
										});
									});
									
									_continueUpdateNotes();
								}
								
								consoleSend(CONSOLE.ERROR, _e);
							} finally {
								if (_nIds.length === _NotesReady.size) {
									/* Removing fake notes */
									removeClassElements('load-PMb84E8y', 'removed-UEg2H5Ps');
									
									consoleSend(CONSOLE.LOG, _NotesReady);
									
									/* Adding note shortcuts, if any */
									if (_NotesPage.size > 0) {
										createLabel(_hNotes, '', 'label-SSrq6Djx', 'notesOnPage');
										
										for (const _hNote of _NotesPage) if (_hNote) _hNotes.append(_hNote);
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
							}
						});
					}
				}
			}
		});
		
		/* Notification about absence notes */
		createLabel(_hNotes, '', 'label-jFU6wwNV', 'notesAll');
		createLabel(_hNotes, '', 'label-jFU6wwNV', 'absenceNotes');
	}
}
