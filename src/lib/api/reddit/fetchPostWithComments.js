import reddit from '~/lib/reddit';
import undata from '~/lib/undata';
import get from 'lodash/get';
import map from 'lodash/map';
import first from 'lodash/first';
import validatePropPost from '~/lib/validateProp/post';
import validatePropComments from '~/lib/validateProp/comments';
import { setPostCache } from '~/lib/api/reddit/fetchPost';

export default async function fetchPostWithComments(subreddit, post_id, comment_id, query) {
  const options = {};

  if (comment_id) {
    options.params = {
      comment: comment_id,
      context: get(query, 'context', 3),
    };
  }

  const [postsRaw, commentsRaw] = (await reddit.get(
    `/r/${subreddit}/comments/${post_id}`,
    options,
  )).data;


  const post = undata(first(postsRaw.data.children));
  const comments = map(commentsRaw.data.children, undata);

  // console.log('commentsRaw', commentsRaw)
  // console.log('comments', comments)

  post===null || validatePropPost(post);
  comments===null || validatePropComments(comments);

  if (post && post_id) {
    setPostCache(post_id, post);
  }

  return {
    post,
    comments,
  };
}
