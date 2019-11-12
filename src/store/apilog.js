import get from 'lodash/get';
import { derived } from 'svelte/store';
import { lsWritable } from '~/lib/ls';
import now from '~/lib/now';

export const list = lsWritable('Apilog', []);

export const apilogCount = derived(list, newListValue => newListValue.length);
export const apilogErrorCount = derived(list, newListValue => newListValue
    .filter(entry => entry.status >= 300).length);

export function flush () {
  list.set([])
}

export function add (input) {
  list.update(listValue => {
    listValue = listValue || [];

    const response = input.response || input;
    // console.log('apiLog.actions.add().input', input);
    // console.log('apiLog.actions.add().response', response);
    const entry = get(response, 'config.apiLog') || { noApiLog: true };
    // console.log('entry', entry)
    const { baseURL } = response.config;
    entry.end = now();
    entry.ms = (entry.end - entry.start) * 1000;
    entry.status = response.status;
    entry.path = response.config.url.replace(baseURL, '/');
    entry.fullPath = response.request.responseURL.replace(baseURL, '/');
    entry.data = response.config.data;
    entry.params = response.config.params;
    entry.method = response.config.method;
    if (entry.status !== 200) {
      entry.result = response.data;
    }

    // console.log('listValue', listValue)
    if (listValue.unshift(entry) > 32) {
      listValue.length = 32;
    }
    return listValue;
  });
}
