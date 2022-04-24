/*
 * Copyright (c) 2022 MineEjo.
 * This file is part of Sainek-Anime-Keeper <https://github.com/MineEjo/Sainek-Anime-Keeper>.
 *
 * Sainek-Anime-Keeper is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Sainek-Anime-Keeper is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JJkBot.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Array with information about the anime on the page */
const Anime = new Map();

/* Most often such arrays are needed for a simple check if there is information on the page */
const aAnimeTitles = [];

function loadPageInfo() {
	const _aTitles = document.getElementsByTagName('h1');

	for (const _sTitle of _aTitles) {
		aAnimeTitles.push(_sTitle.innerText);
		_sTitle.classList.add(SHORTCUT_CLASS);

		!Anime.has(_sTitle) && Anime.set('0', {
			'title': _sTitle.innerText,
			'object': _sTitle
		});
	}
}
