import { lsWritable } from '~/lib/ls';

export const list = lsWritable('Searches', [])

export function setSearch (input) {
  if (input && input.name) {
    list.update(searchesValues => {
      return {
        ...searchesValues,
        [input.name]: {
          ...input,
        },
      };
    });
  }
}

export function remove (name) {
  if (name) {
    list.update(searchesValues => {
      return {
        ...searchesValues,
        [name]: void 0,
      };
    });
  }
}

export function flush () {
  list.set({});
}
