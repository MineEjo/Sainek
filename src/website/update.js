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

/* Array with words to search for them on the page, eventually to determine the state of the items */
const aDisplayingTriggers = [
	'anime', /* The first item, is considered the default item */
	'аниме',
	'アニメ',
	'动漫'
];

updateState();

function updateState() {
	try {
		getData(false, 'blackList', (_response) => {
			/* Checking if the domain or link of the site is blacklisted */
			if (_response && (_response.includes(document.location.href) ||
				JSON.stringify(_response).includes(`${document.location.protocol}//${document.location.hostname}/\\n`))) {
				return;
			}

			/* Search for triggers on the page */
			let _bTriggered = false;
			for (const _sTrigger of aDisplayingTriggers) {
				if (document.body.innerText.indexOf(_sTrigger) > -1) _bTriggered = true;
			}

			/* The second check is responsible for the word in the site address */
			if (_bTriggered || window.location.href.includes(aDisplayingTriggers[0])) {
				loadWebsiteInfo();

				loadStatuses();

				getData(true, 'boardDisable', (_response) => {
					if (!_response) {
						loadBoard();

						getData(true, 'boardAttached', (_response) => {
							setAttachBoard(_response);
						});
					}
				});

				getData(true, 'debugMode', (_response) => {
					setDebugMode(_response);
				});

				getData(true, 'extensionTheme', (_response) => {
					setTheme(false, _response);
				});
			}
		})
	} catch (_e) {
		consoleSend('N22KhK6A8XqQg7tz', CONSOLE.ERR, {N22KhK6A8XqQg7tz: _e});
	}
}
