import get from 'lodash/get';
import isObject from 'lodash/isObject';

export default function getImgurAlbumId (input) {
  if (isObject(input)) {
    return getImgurAlbumId(input.url);
  }
  if (input && input.includes && (input.includes('imgur.com/a/') || input.includes('imgur.com/gallery/'))) {
    const result = imgurAlbumIdRegEx.exec(input);
    return (result && result[2]) || null;
  }
  return null;
}

const imgurAlbumIdRegEx = /https:.*imgur\.com\/(a|gallery)\/([a-zA-Z0-9]{4,12})\/{0,1}/ig
