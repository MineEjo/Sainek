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

const STATUSES = new Map();
STATUSES.set('1', 'not-watch-juX4pc2a');
STATUSES.set('2', 'watching-M6DsAF2K');
STATUSES.set('3', 'watched-xB5Pq4kZ');
STATUSES.set('4', 'want-to-watch-ry9yUf3Z');

/* !TODO: Realize after the panel */
function loadAnimeStatuses() {
	for (const _jAnime of Anime.values()) {
		const _nStatus = undefined;

		if (_nStatus) {
			createLabel(_jAnime.object, ``, ['status-ty2aYeHq', STATUSES.get(_nStatus)], _nStatus.toString());
		}
	}
}