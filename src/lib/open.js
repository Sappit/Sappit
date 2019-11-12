import { writable } from 'svelte/store';

export function oneOpen (initialValue = null) {
  let target = {
    open: initialValue,
  };

  const { subscribe, set, update } = writable(null);

  const proxy = new Proxy(target, {
    get (target, name, receiver) {
      // console.log(target, name, receiver)
      if (name === 'any') {
        return target.open !== null;
      } else if (name.startsWith('toggle')) {
        return () => {
          const key = name.slice(6).toLowerCase();

          target.open = target.open === key ? null : key;
          set(proxy)
        }
      } else {
        return name === target.open;
      }
    },
  })

  set(proxy)

  return {
    subscribe,
    set(newValue) {
      target.open = newValue;
      set(proxy);
    }
  }
}
