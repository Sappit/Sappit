import { writable } from 'svelte/store';

const prefix = 'nrc_';

export function has(key) {
  if (!process.browser) return false;
  try {
    const rawValue = window.localStorage.getItem(`${prefix}${key}`);

    // null means not set in localStorage
    // if the value was set explicitly to null,
    // it would be returned as string "null"
    return rawValue !== null;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function get(key, defaultValue = null) {
  if (!process.browser) return defaultValue;
  try {
    const rawValue = window.localStorage.getItem(`${prefix}${key}`);
    if (rawValue === null) {
      return defaultValue;
    }
    const parsedValue = JSON.parse(rawValue);
    return parsedValue;
  } catch (err) {
    console.error(err);
    return defaultValue;
  }
}

export function set(key, value) {
  if (!process.browser) return;
  try {
    const json = JSON.stringify(value);
    window.localStorage.setItem(`${prefix}${key}`, json);
  } catch (err) {
    console.error(err);
  }
}

export function forget(key) {
  if (!process.browser) return;
  try {
    window.localStorage.removeItem(`${prefix}${key}`);
  } catch (err) {
    console.error(err);
  }
}

const syncMap = {};

if (process.browser) {
  window.addEventListener('storage', event => {
    // console.log('storage!', event);
    if (event.key === null) {
      for (const key in syncMap) {
        if (syncMap.hasOwnProperty(key)) {
          const clonedDefaultValue = JSON.parse(JSON.stringify(syncMap[key].defaultValue))
          syncMap[key].set(clonedDefaultValue);
        }
      }
    } else if (event.key && event.key.startsWith(prefix)) {
      const key = event.key.replace(prefix, '');
      if (syncMap[key]) {
        // console.log('storage.key', event.key, event);
        // commit(syncMap[key], event);
        if (event.newValue === null) {
          const clonedDefaultValue = JSON.parse(JSON.stringify(syncMap[key].defaultValue))
          syncMap[key].set(clonedDefaultValue);
          // syncMap[key].set(null);
        } else {
          syncMap[key].set(JSON.parse(event.newValue));
        }
      }
    }
  });
}

export function lsWritable (key, defaultValue) {
  const newStore = writable(defaultValue);

  newStore.defaultValue = defaultValue;

  if (syncMap[key]) {
    throw new Error(`ls syncMap setter already exists for key ${key}`);
  }
  syncMap[key] = newStore;

  if (has(key)) {
    // console.log('has(key)', {key}, {value: get(key)});
    newStore.set(get(key));
  } else {
    // console.log('!has(key)', {key}, {defaultValue});
    newStore.set(defaultValue);
  }

  newStore.subscribe(newValue => {
    // console.log('setting new value to ls');
    // console.log(newValue);
    set(key, newValue)
  });

  return newStore;
}

// export function syncVuexMutators(arr) {
//   return arr.reduce((carry, key) => {
//     carry[key] = (state, payload) => {
//       if (payload instanceof StorageEvent) {
//         state[key] = JSON.parse(payload.newValue);
//       } else {
//         // console.log('writing LS ', key, {
//         //   newValue: payload,
//         //   oldValue: get(key),
//         // });
//         set(key, payload);
//         state[key] = payload;
//       }
//     };
//     return carry;
//   }, {});
// }
// export function addSyncVuexListener({ syncMap, commit }) {
//   window.addEventListener('storage', event => {
//     // console.log('storage!', event);
//     if (event.key === null) {
//       Object.values(syncMap).forEach(mutator => {
//         commit(mutator, {});
//       });
//     } else if (event.key && event.key.startsWith(prefix)) {
//       const key = event.key.replace(prefix, '');
//       if (syncMap[key]) {
//         // console.log('storage.key', event.key, event);
//         commit(syncMap[key], event);
//       }
//     }
//   });
// }
