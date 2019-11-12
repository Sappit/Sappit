import get from 'lodash/get';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import includes from 'lodash/includes';
import isFunction from 'lodash/isFunction';
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import undata from '~/lib/undata';

export const defaultParams = Object.freeze({
  limit: 25,
});

export default async function fetchItems({ path, query, }) {
  const filterOptions = {};

  const response = await reddit.get(path, {
    params: {
      ...defaultParams,
      ...query,
    },
  });

  const items = isArray(get(response, 'data.data.children'))
    ? map(get(response, 'data.data.children', []), undata)
    : map(get(response, 'data', []), undata);
  const before = get(response, 'data.data.before');
  const after = get(response, 'data.data.after');

  setItemsFilteredProperty(items, filterOptions);

  const zeroResults = !(items.length > 0);
  const showBottomPagination = (items.length > 2);

  // console.log('fetchItems.done');

  return {
    before,
    after,
    items,
    showBottomPagination,
    path,
    query,
    zeroResults,
  };
}

function setItemsFilteredProperty(items, filterOptions) {
  const { text } = filterOptions;
  const lc_text = (text || '').toLowerCase();

  if (!get(items, 'length', 0) > 0) {
    return;
  }
  for (let i = items.length - 1, item; i >= 0; i--) {
    item = items[i];
    item.sappitHide = !isMatch(item);
  }

  function isMatch({ kind, body }) {
    if (lc_text) {
      const lc_body = (body || '').toLowerCase();
      if (includes(lc_body, lc_text)) {
        return true;
      }
      return false;
    }
    return true;
  }
}
