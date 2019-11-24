import get from 'lodash/get';
import { derived } from 'svelte/store';
import { lsWritable } from '~/lib/ls';
import now from '~/lib/now';

export const list = lsWritable('Apilog', []);

export const apilogCount = derived(list, newListValue => newListValue.length);
export const apilogErrorCount = derived(list, newListValue => newListValue
    .filter(entry => entry && entry.status >= 300).length);

export function flush () {
  list.set([])
}

export function add (input) {
  list.update(listValue => {
    listValue = listValue || [];

    const response = input.response || input;
    // console.log('apiLog.actions.add().input', input);
    // console.log('apiLog.actions.add().response', response);
    const config = get(response, 'config') || { noConfig: true };
    const entry = get(config, 'apiLog') || { noApiLog: true };
    console.log('entry', entry)
    console.log('config', config)
    console.log('response', response)
    console.log('input', input)
    const baseURL = get(response, 'config.baseURL') || null;
    entry.end = now();
    entry.ms = (entry.end - entry.start) * 1000;
    entry.status = get(response, 'status');
    entry.path = config.url ? config.url.replace(baseURL, '/') : null;
    entry.fullPath = (get(response, 'request.responseURL') || '').replace(baseURL, '/');
    entry.data = config.data;
    entry.params = config.params;
    entry.method = config.method;
    if (entry.status !== 200) {
      entry.result = get(response, 'data');
    }

    // console.log('listValue', listValue)
    if (listValue.unshift(entry) > 32) {
      listValue.length = 32;
    }
    return listValue;
  });
}
