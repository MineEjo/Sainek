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

const POPUP_EN = {
	title: 'Sainek - Serials Keeper',
	donate: 'Donate',
	appearance: 'Appearance',
	nightTheme: 'Night Theme',
	boardAttached: 'Attached board',
	settings: 'Settings',
	debugMode: 'Debug',
	boardDisable: 'Disable board',
	blackList: 'Site blacklist',
	config: 'Config',
	alertReloadExtension: 'Turn the extension on and off in your browser settings for the changes to take effect!'
};

const POPUP_RU = {
	title: 'Sainek - Хранитель сериалов',
	donate: 'Поддержка',
	appearance: 'Внешний вид',
	nightTheme: 'Ночная тема',
	boardAttached: 'Закрепить панель',
	settings: 'Настройки',
	debugMode: 'Отладка',
	boardDisable: 'Выключить панель',
	blackList: 'Чёрный список сайтов',
	config: 'Конфиг',
	alertReloadExtension: 'Включите и выключите расширение в настройках браузера, чтобы изменения вступили в силу!'
};

const POPUP = {
	boosty: 'https://boosty.to/mineejo',
	github: 'https://github.com/MineEjo/Sainek-Serials-Keeper',
	firebase: 'https://firebase.google.com/'
};

const LANG = new Map();
LANG.set('en', POPUP_EN);
LANG.set('ru', POPUP_RU);
LANG.set(0, POPUP);