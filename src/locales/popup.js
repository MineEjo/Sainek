const POPUP_EN = {
	title: 'Sainek - Anime Keeper',
	donate: 'Donate',
	appearance: 'Appearance',
	nightTheme: 'Night Theme',
	settings: 'Settings',
	debugMode: 'Debug',
	boardDisable: 'Disable board',
	blackList: 'Site blacklist',
	config: 'Config',
	alertReloadExtension: 'Turn the extension on and off in your browser settings for the changes to take effect!',
};

const POPUP_RU = {
	title: 'Sainek - Хранитель аниме',
	donate: 'Поддержка',
	appearance: 'Внешний вид',
	nightTheme: 'Ночная тема',
	settings: 'Настройки',
	debugMode: 'Отладка',
	boardDisable: 'Выключить панель',
	blackList: 'Чёрный список сайтов',
	config: 'Конфиг',
	alertReloadExtension: 'Включите и выключите расширение в настройках браузера, чтобы изменения вступили в силу!',
};

const POPUP = {
	boosty: 'https://boosty.to/mineejo',
	github: 'https://github.com/MineEjo/Sainek-Anime-Keeper',
	firebase: 'https://firebase.google.com/'
};

const LANG = new Map();
LANG.set('en', POPUP_EN);
LANG.set('ru', POPUP_RU);
LANG.set(0, POPUP);