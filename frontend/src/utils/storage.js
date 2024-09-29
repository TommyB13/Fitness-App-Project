const data = {};
let isLocalStorageSupport = true;

const prefix = key => `fitness-${key}`;

export const detectLocalStorageSupport = () => {
	try {
		window.localStorage.setItem('test', '1');
		window.localStorage.removeItem('test');
	} catch (e) {
		console.warn('Does not support localStorage', e);
		isLocalStorageSupport = false;
	}
};

const setItem = (key, value) => {
	const prefixKey = prefix(key);

	if (isLocalStorageSupport) {
		window.localStorage.setItem(prefixKey, value);
		return;
	}

	data[prefixKey] = value;
};

const getItem = key => {
	const prefixKey = prefix(key);

	if (isLocalStorageSupport) {
		return window.localStorage.getItem(prefixKey);
	}

	if (Object.hasOwnProperty.call(data, prefixKey)) {
		return data[prefixKey];
	}

	return null;
};

const removeItem = key => {
	const prefixKey = prefix(key);

	if (isLocalStorageSupport) {
		window.localStorage.removeItem(prefixKey);
		return;
	}

	if (Object.hasOwnProperty.call(data, prefixKey)) {
		delete data[prefixKey];
	}
};

export default {
	setItem,
	getItem,
	removeItem,
};
