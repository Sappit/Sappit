import get from 'lodash/get';

export default function getAfter(collection, page, lastId, count) {
  if (get(collection, 'after')) {
    return collection.after;
  }
  if (get(collection, 'data.after')) {
    return collection.data.after;
  }
  // if (lastId) {
  //   if ($page.query.before || count === 0) {
  //     return lastId;
  //   }
  // }
  if (page.query.before) {
    return page.query.before;
  }
  return null;
}
