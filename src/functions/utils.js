function genId() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function capitalizeFirstLetter(_sString) {
	return _sString.charAt(0).toUpperCase() + _sString.slice(1);
}