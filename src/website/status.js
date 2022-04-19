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