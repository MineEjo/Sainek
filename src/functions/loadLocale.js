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

if (LANG.has(USER_LANG)) {
	const LOCALE = LANG.get(USER_LANG);

	for (const _hElement of document.getElementsByClassName('locale')) {
		_hElement.innerHTML = LOCALE[_hElement.innerHTML];
	}

	function _getLocale(_sKey) {
		return LOCALE[_sKey]
	}
}