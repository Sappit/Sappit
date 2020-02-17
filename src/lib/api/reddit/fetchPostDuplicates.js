import get from 'lodash/get';
import map from 'lodash/map';
import reddit from '~/lib/reddit';
import undata from '~/lib/undata';

const fetchPostPromises = {};

/**
 * @todo we might be able to get the post without the comments
 **/
export default async function fetchDuplicates(post) {
  const duplicatesRaw = (await reddit.get(`/api/info`, {
    params: {
      url: post.url,
    },
  })).data;

  const duplicates = map(get(duplicatesRaw, 'data.children'), undata);

  return duplicates;
}
