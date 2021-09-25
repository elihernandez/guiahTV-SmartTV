export const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))

export function getLocalStorageWithExpiry(key) {
	const item = getLocalStorage(key)
	// if the item doesn't exist, return null
	if (!item) {
		return null
	}

	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		window.localStorage.removeItem(key)
		return null
	}

	return item.value
}

export const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export function setLocalStorageWithExpiry(key, value, ttl) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}

	setLocalStorage(key, item)
}
