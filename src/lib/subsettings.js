import { Store, get, set, keys, del, clear } from 'idb-keyval';

const store = process.browser ? new Store('srs') : {};

export default {
  store,
  set: (k, v) => (console.log({ k, v, json: JSON.stringify(v) }), set(k, JSON.stringify(v), store)),
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
