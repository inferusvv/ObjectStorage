function setStorage(storage, key, value) {
  if (typeof value !== 'object') {
    throw new Error('Value should be an object');
  }
  return storage.setItem(key, JSON.stringify(value));
}

class ObjectStorage {
  /**
   * Create new object to work with storage
   * @param {*} key - Storage name
   * @param {*} [storage=localStorage] - Storage API object
   */
  constructor(key, storage = localStorage) {
    this.storageObject = storage;
    this.key = key;
  }

  /**
   * @type {object} - Current storage object
   */
  get storage() {
    const storage = JSON.parse(this.storageObject.getItem(this.key));
    if (storage !== null && typeof storage === 'object') {
      return storage;
    }
    return {};
  }

  /**
   * Clear storage (empty object will be applied)
   * @returns - New storage object
   */
  clear() {
    const storage = {};
    return this.update(storage);
  }

  /**
   * Get field by key
   * @param {string} key - Field which should be returned
   * @returns {*} - Field value
   */
  get(key) {
    return this.storage[key];
  }

  /**
   * Remove one or more fields from storage
   * @param {...string} keys - Key(s) which should be deleted from object
   * @returns {object} - New storage object
   */
  remove(...keys) {
    const { storage } = this;
    keys.forEach(key => {
      delete storage[key];
    });
    return this.update(storage);
  }

  /**
   * Set new values or update existing
   * @param {object} data - Object with keys and values to set in storage
   * @returns {object} - New storage object
   */
  set(data) {
    const updatedStorage = {
      ...this.storage,
      ...data,
    };
    return this.update(updatedStorage);
  }

  /**
   * Replace all storage with new
   * @param {object} data - New storage object
   * @returns - New storage object
   */
  update(data) {
    setStorage(this.storageObject, this.key, data);
    return data;
  }
}

export default ObjectStorage;
