import reject from 'lodash/reject';
import lodash_shuffle from 'lodash/shuffle';
import { lsWritable } from '~/lib/ls';

export const list = lsWritable('Queue', []);
export const doneList = lsWritable('QueueDone', []);

export function flush () {
  list.set([])
  doneList.set([])
}

export function markDone (entry) {
  const fn = e => isSameEntry(e, entry);
  list.update(oldListValue => reject(oldListValue, fn));
  doneList.update(oldListValue => [entry, ...reject(oldListValue, fn)].slice(0, 16));
}

export function requeue (entry) {
  list.update(oldListValue => [...reject(oldListValue, e => isSameEntry(e, entry)), entry]);
}

export function reverse () {
  list.update(oldListValue => oldListValue.reverse());
}

export function shuffle () {
  list.update(oldListValue => lodash_shuffle(oldListValue));
}

export function add (entry) {
  list.update(oldListValue => [...reject(oldListValue, e => isSameEntry(e, entry)), entry]);
}

export function remove (entry) {
  list.update(oldListValue => reject(oldListValue, e => isSameEntry(e, entry)));
}

export function isSameEntry(e1, e2) {
  if (e1 && e2) {
    if (e1 === e2) {
      return true;
    }
    if (e1.name && e1.name === e2.name) {
      return true;
    }
    if (e1.route && e1.route === e2.route) {
      return true;
    }
  }
  return false;
}
