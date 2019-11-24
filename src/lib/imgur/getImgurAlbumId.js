import get from 'lodash/get';
import isObject from 'lodash/isObject';

export default function getImgurAlbumId (input) {
  if (isObject(input)) {
    return getImgurAlbumId(input.url);
  }
  if (input && input.includes && (input.includes('imgur.com/a/') || input.includes('imgur.com/gallery/'))) {
    return get(imgurAlbumIdRegEx.exec(input), 'groups.albumid') || null;
  }
  return null;
}

const imgurAlbumIdRegEx = /https:.*imgur\.com\/(a|gallery)\/(?<albumid>[a-zA-Z0-9]{4,12})\/{0,1}/ig
