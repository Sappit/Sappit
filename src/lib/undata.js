import get from 'lodash/get';
import map from 'lodash/map';

export default function undata (data) {
  if (data === null) return null;
  if (data.kind && data.data) {
    data.data.kind = data.data.kind || data.kind;

    data = data.data;

    if (data.replies && data.replies.kind === 'Listing') {
      data.replies = map(get(data, 'replies.data.children'), undata);
    }

    return data;
  }
  // console.warn('unhandled undata kind: '+data.kind, data);
  return data;
}
