import first from 'lodash/first';
import reddit from '~/lib/reddit';
import undata from '~/lib/undata';
import validatePropPost from '~/lib/validateProp/post';

const fetchPostPromises = {};

/**
 * @todo we might be able to get the post without the comments
 **/
export default async function fetchPost(subreddit, post_id) {
  if (!fetchPostPromises[post_id]) {
    const [postsRaw, commentsRaw] = (await reddit.get(
      `/r/${subreddit}/comments/${post_id}`,
    )).data;

    const post = undata(first(postsRaw.data.children));
    // const comments = map(commentsRaw, undata);

    post===null || validatePropPost(post);
    // comments===null || validatePropComments(comments);

    setPostCache(post_id, post);
  }
  return fetchPostPromises[post_id];
}

export function setPostCache (post_id, post) {
  fetchPostPromises[post_id] = Promise.resolve(post);
}
