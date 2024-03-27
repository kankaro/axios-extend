/**
 * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
 * @param key The key name to be inserted.
 * @param value The key value associated with the given key.
 */
export function setStorageItem(key: string, value: string) {
  if (!key || !value) {
    throw new Error('Key and value are required');
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Returns the current value associated with the given key, or null if the given key does not exist.
 * @param key The key name to look for.
 * @returns The key value associated with the given key. Otherwise `null` if the given key does not exist.
 */
export function getStorageItem(key: string) {
  const value = window.localStorage.getItem(key);
  if (value && typeof value !== 'string') {
    throw new Error('Value must be a string.');
  }
  return value ? JSON.parse(value) : null;
}

/**
 * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
 * @param key The key name to look for.
 */
export function removeStorageItem(key: string) {
  if (!key) {
    throw new Error('Key is required');
  }
  window.localStorage.removeItem(key);
}

/**
 * Removes multiple key/value pair with the given key, if a key/value pair with the given key exists.
 * @param keys Collection of keys to be remove.
 */
export function removeStorageItems(keys: Array<string>) {
  if (keys.length === 0) {
    throw new Error('Key is required');
  }

  keys.forEach((key) => {
    removeStorageItem(key);
  });
}
