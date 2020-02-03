import { Store, get, set, keys, del, clear } from 'idb-keyval';

const store = process.browser ? new Store('ut1') : {};

export default {
  store,
  set: (k, v) => set(k, v, store),
  get: k => get(k, store),
  del: k => del(k, store),
  keys: () => keys(store),
  clear: () => clear(store),
};
