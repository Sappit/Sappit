import { derived, writable } from 'svelte/store'

export const cache = writable({});

export const cachedCount = derived(cache, newCacheValue => {
  let count = 0;
  for (const key in newCacheValue) {
    if (newCacheValue.hasOwnProperty(key)) {
      count++;
    }
  }
  return count;
})

export function findByUsername () {
  // @todo
}

export function flush () {
  // @todo
}

export function fetchTags () {
  // @todo
}
