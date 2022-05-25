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

/* Array with information about the serial on the page */
const Serials = new Map();

/* Most often such arrays are needed for a simple check if there is information on the page */
const aSerialTitles = [];

function loadWebsiteInfo() {
	const _aTitles = document.getElementsByTagName('h1');
	
	for (const _sTitle of _aTitles) {
		aSerialTitles.push(_sTitle.innerText);
		_sTitle.classList.add(CSS.CLASS.SHORTCUT);
		
		!Serials.has(_sTitle) && Serials.set('0', {
			'title': _sTitle.innerText,
			'object': _sTitle
		});
	}
}
