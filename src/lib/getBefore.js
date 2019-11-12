import get from 'lodash/get';

export default function getBefore(collection, page, lastId, count) {
  if (get(collection, 'before')) {
    return collection.before;
  }
  if (get(collection, 'data.before')) {
    return collection.data.before;
  }
  // if (lastId) {
  //   if ($page.query.before || count === 0) {
  //     return lastId;
  //   }
  // }
  if (page.query.after) {
    return page.query.after;
  }
  return null;
}
