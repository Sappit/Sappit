import get from 'lodash/get';
import first from 'lodash/first';
import filter from 'lodash/filter';
import now from '~/lib/now';
import { derived } from 'svelte/store';
import { lsWritable } from '~/lib/ls';

export const list = lsWritable('History', []);

export const historyCount = derived(list, newListValue => newListValue.length);

export function flush () {
  list.set([])
}

export function add (route) {
  list.update(listValue => {

    // console.log(route)

    const firstEntry = first(listValue);
    const entry = {
      timestamp: now(),
      path: route.path,
      params: route.params,
      subEntries: [
        {
          path: route.path,
          query: route.query,
          timestamp: now(),
        },
      ],
    }

    if (firstEntry && firstEntry.path === entry.path) {
      entry.timestamp = firstEntry.timestamp;
      entry.subEntries = [...entry.subEntries, ...firstEntry.subEntries];
    }

    return [
        entry,
        ...filter(
          listValue,
          e => e.timestamp !== entry.timestamp && e.path !== entry.path,
        ),
      ].slice(0, 32);
  });
}
