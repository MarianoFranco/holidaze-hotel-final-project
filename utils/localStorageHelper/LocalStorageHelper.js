export const saveToLocalStorage = function (key, value) {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getStorageItem = function (key) {
	if (localStorage.getItem(key) !== null) {
		return JSON.parse(localStorage.getItem(key));
	} else {
		return null;
	}
};
