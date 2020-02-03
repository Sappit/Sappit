import { Store, get, set, keys, del, clear } from 'idb-keyval';

const store = process.browser ? new Store('r', 'srs1') : {};

export default {
  store,
  set: (k, v) => set(k, JSON.stringify(v), store),
  get: k => {
    try {
      return JSON.parse(get(k, store)) || {};
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
    }
    return {}
  },
  del: k => del(k, store),
  keys: () => keys(store),
  clear: () => clear(store),
};
